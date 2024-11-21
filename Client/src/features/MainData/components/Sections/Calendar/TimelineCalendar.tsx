import "@/calendar.css";
import { useEffect, useState, useRef, useCallback } from "react";
import * as BreakPoint from "@/config/responsiveDesign";
import {
  Scheduler,
  SchedulerData,
  ViewType,
  DATE_FORMAT,
} from "react-big-schedule";
import WrapperFun from "@/Utils/WrapperFun";
import { CloseButton } from "../Table/Actions/Buttons";
import Modal from "@/components/Elements/Modal";
import { CalendarForm } from "./Form/CalendarForm";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ConfirmToast, TimerToast } from "@/components/Elements/Toast";
import { TimelineFields } from "@/config/FormConfig/timeline";
import { useWindowSize } from "react-use";
import { TimelineLoading } from "../../Elements/Loading/TimelineLoading";
import dayjs from "@/lib/dayjs";
import { useToken } from "@/hooks/useToken";

interface Timeline {
  events: any;
  resources: any;
  mutation: {
    invalidateKey: {
      event: string[];
      resource: string[];
    };
    post: {
      event: UseMutationResult<any, unknown, any, unknown>;
    };
    del: {
      event: UseMutationResult<any, unknown, any, unknown>;
      resource: UseMutationResult<any, unknown, any, unknown>;
    };
  };
  leftCustomHeader: React.ReactNode;
}

function Timeline({ events, resources, mutation, leftCustomHeader }: Timeline) {
  const { width } = useWindowSize();

  const {
    modals: { calendarModal },
    closeModal,
    openModal,
  } = useModalStore();

  const { initialData, setFields, setInitialData } = useFormStore();

  const schedulerData = new SchedulerData(
    dayjs().format(DATE_FORMAT),
    ViewType.Month,
    false,
    false,
    {
      resourceName: "Timeline",
      responsiveByParent: true,
      schedulerWidth: "95%",
      schedulerMaxHeight:
        width >= BreakPoint.XXL
          ? 0
          : width >= BreakPoint.XL
          ? 450
          : width >= BreakPoint.LG
          ? 400
          : width >= BreakPoint.MD
          ? 350
          : width >= BreakPoint.SM
          ? 300
          : 250,
      views: [
        {
          viewName: "Timeline View",
          viewType: ViewType.Month,
          showAgenda: false,
          isEventPerspective: false,
        },
      ],
    }
  );

  const [schedule, setSchedule] = useState<SchedulerData | null>(null);

  const parentRef = useRef(null);

  useEffect(() => {
    schedulerData.setResources(resources || []);
    schedulerData.setEvents(events || []);
    setSchedule(schedulerData);
  }, [resources, events]);

  const prevClick = (schedulerData: SchedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(events || []);
  };

  const nextClick = (schedulerData: SchedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(events || []);
  };

  const onViewChange = (schedulerData: SchedulerData, view: any) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(events || []);
  };

  const onSelectDate = (schedulerData: SchedulerData, date: any) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(events || []);
  };

  const onCloseFormModal = () => {
    closeModal("calendarModal");
    setFields([]);
    setInitialData({});
  };

  const newEvent = (
    schedulerData: SchedulerData,
    slotId: any,
    slotName: any,
    start: any,
    end: any,
    type: any,
    item: any
  ) => {
    openModal("calendarModal");
    setFields(TimelineFields);
    setInitialData({
      schedulerData,
      title: "",
      start,
      end,
      slotId,
      slotName,
      bgColor: "#2596be",
      type,
      item,
    });
  };

  const queryClient = useQueryClient();

  // ADD EVENT
  const handleAddEvent = useCallback(
    async (values: any) => {
      const newEvent = {
        title: values.title,
        start: initialData.start,
        end: initialData.end,
        resourceId: initialData.slotId,
        bgColor: values.bgColor,
      };
      await mutation.post.event
        .mutateAsync(newEvent, {
          onSuccess: ({ data }: any) => {
            TimerToast("success", "Event berhasil ditambahkan!", data.message);
          },
          onError: ({ response }: any) => {
            TimerToast(
              "error",
              "Event gagal ditambahkan!",
              response.data.message
            );
          },
        })
        .then(() => onCloseFormModal())
        .then(() =>
          queryClient.invalidateQueries({
            queryKey: mutation.invalidateKey.event,
          })
        )
        .then(() => mutation.post.event.reset());
    },
    [mutation, initialData, onCloseFormModal, queryClient]
  );

  // DELETE EVENT
  const handleDeleteEvent = useCallback(
    (schedulerData: SchedulerData, event: any) => {
      if (!schedulerData) return;
      ConfirmToast(
        "warning",
        "Apakah Anda yakin?",
        `Anda akan menghapus event "${event.title}" !`
      ).then(async (result) => {
        if (result.isConfirmed) {
          await mutation.del.event
            .mutateAsync(event.id, {
              onSuccess: ({ data }: any) => {
                TimerToast("success", "Event berhasil dihapus!", data.message);
              },
              onError: ({ response }: any) => {
                TimerToast(
                  "error",
                  "Event gagal dihapus!",
                  response.data.message
                );
              },
            })
            .then(() =>
              queryClient.invalidateQueries({
                queryKey: mutation.invalidateKey.event,
              })
            )
            .then(() => mutation.del.event.reset());
        }
      });
    },
    [ConfirmToast, mutation, queryClient]
  );

  // HANDLE DELETE RESOURCE
  const handleDelResource = useCallback(
    (schedulerData: SchedulerData, slot: any) => {
      if (!schedulerData) return;
      ConfirmToast(
        "question",
        "Apakah anda yakin ingin menghapus resource ini?"
      ).then(async (result) => {
        if (result.isConfirmed) {
          await mutation.del.resource
            .mutateAsync(slot.slotId, {
              onSuccess: ({ data }: any) => {
                TimerToast(
                  "success",
                  "Resource berhasil dihapus",
                  data.message
                );
              },
              onError: ({ response }: any) => {
                TimerToast(
                  "success",
                  "Resource berhasil dihapus",
                  response.data.message
                );
              },
            })
            .finally(() => {
              queryClient.invalidateQueries({
                queryKey: mutation.invalidateKey.resource,
              });
              mutation.del.resource.reset();
            });
        }
      });
    },
    [ConfirmToast, mutation, queryClient]
  );

  const {
    userDetails: { role },
  } = useToken();

  return (
    <div
      className="noverflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      ref={parentRef}>
      {/* Tambahkan ref ke elemen induk */}
      {schedule ? (
        <Scheduler
          schedulerData={schedule}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          eventItemClick={role === "admin" ? handleDeleteEvent : undefined}
          newEvent={newEvent}
          slotClickedFunc={role === "admin" ? handleDelResource : undefined}
          leftCustomHeader={leftCustomHeader}
          parentRef={parentRef}
        />
      ) : (
        <TimelineLoading />
      )}
      <Modal
        isOpen={calendarModal}
        trigger={{
          onClose: (
            <CloseButton
              onClick={() => {
                closeModal("calendarModal");
                setFields([]);
                setInitialData({});
              }}
            />
          ),
        }}>
        <Modal.Title>Tambah Event</Modal.Title>
        <Modal.Content>
          {/* FORM */}
          <CalendarForm onSubmit={handleAddEvent} />
          {/* END FORM */}
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default WrapperFun<Timeline>(Timeline);
