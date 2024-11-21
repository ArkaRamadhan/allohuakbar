import Sidebar, {
  SidebarItem,
  SidebarCollapse,
} from "@/components/Fragments/features/Sidebar";
import Header from "@/components/Fragments/Notification/Header";
import { usePostData } from "@/features/MainData/hooks/useAPI";
import { useToken } from "@/hooks/useToken";
import { MiddlewareProvider } from "@/lib/middleware";
import {
  Activity,
  Earth,
  FileArchive,
  FileBox,
  HandPlatterIcon,
  LayoutDashboard,
  LogOut,
  Timer,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConfirmToast, TimerToast } from "../Elements/Toast";

const App = ({
  services,
  children,
}: {
  services: string | undefined;
  children: React.ReactNode;
}) => {
  const { userDetails } = useToken();

  // API LOGOUT
  const Logout = usePostData({
    axios: {
      url: "/logout",
    },
  });

  // PINDAH HALAMAN
  const navigate = useNavigate();

  // HANDLE LOGOUT
  const handleSignOut = async () => {
    ConfirmToast("warning", "Apakah anda yakin?", "Anda akan logout!").then(
      async (result) => {
        if (result.isConfirmed) {
          await Logout.mutateAsync(undefined, {
            onSuccess: ({ data }: any) => {
              TimerToast("success", "Logout Berhasil!", data.message);
            },
            onError: ({ response }: any) => {
              TimerToast("error", "Logout Gagal!", response.data.message);
            },
          }).then(() => {
            navigate("/login");
          });
        }
      }
    );
  };

  return (
    <div className="grid grid-cols-[auto_1fr] h-full max-h-screen">
      {/* Sidebar */}
      <div className="max-h-screen overflow-y-auto">
        <Sidebar
          img="../../../public/images/logobjb.png"
          title="Divisi IT Security"
          username={userDetails.username}
          email={userDetails.email}>
          <SidebarItem
            href="/dashboard"
            text="Dashboard"
            icon={<LayoutDashboard />}
          />
          <SidebarCollapse text="Dokumen" icon={<FileArchive />}>
            <SidebarItem href="/memo" text="Memo" />
            <SidebarItem href={"/berita-acara"} text="Berita Acara" />
            <SidebarItem href="/surat" text="Surat" />
            <SidebarItem href="/sk" text="Sk" />
            <SidebarItem href="/perjalanan-dinas" text="Perjalanan Dinas" />
          </SidebarCollapse>
          <SidebarCollapse text="Project" icon={<FileBox />}>
            <SidebarItem href="/project" text="Project" />
            <SidebarItem href="/base-project" text="Base Project" />
          </SidebarCollapse>
          <SidebarCollapse text="Kegiatan" icon={<Activity />}>
            <SidebarItem
              href="/timeline-desktop"
              text="Timeline Wallpaper Desktop"
            />
            <SidebarItem href="/booking-rapat" text="Booking Ruang Rapat" />
            <SidebarItem href="/jadwal-rapat" text="Jadwal Rapat" />
            <SidebarItem href="/jadwal-cuti" text="Jadwal Cuti" />
            <SidebarItem href="/meeting" text="Meeting" />
          </SidebarCollapse>
          <SidebarCollapse text="Weekly Timeline" icon={<Timer />}>
            <SidebarItem href="/timeline-project" text="Timeline Project" />
            <SidebarItem href="/meeting-schedule" text="Meeting Schedule" />
          </SidebarCollapse>
          <SidebarCollapse text="Informasi" icon={<Earth />}>
            <SidebarItem href="/surat-masuk" text="Surat Masuk" />
            <SidebarItem href="/surat-keluar" text="Surat Keluar" />
            <SidebarItem href="/arsip" text="Arsip" />
          </SidebarCollapse>
          {/* AUTHORIZATION */}
          {userDetails.role === "admin" && (
            <>
              <SidebarItem href="/user" text="User" icon={<User />} />
              <SidebarItem
                href="/request"
                text="Request"
                icon={<HandPlatterIcon />}
              />
            </>
          )}
          <SidebarItem
            onClick={handleSignOut}
            text="Logout"
            icon={<LogOut />}
          />
        </Sidebar>
      </div>
      {/* End Sidebar */}
      {/* Main */}
      <div className="grid grid-rows-[auto_1fr] h-screen overflow-y-auto">
        <Header title={services} />
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {/* MIDDLEWARE */}
          <MiddlewareProvider>{children}</MiddlewareProvider>
        </div>
      </div>
      {/* End Main */}
    </div>
  );
};
export default App;
