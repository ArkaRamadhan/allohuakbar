import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  trigger?: {
    onOpen?: React.ReactNode;
    onClose?: React.ReactNode;
  };
};

const Modal = ({ children, isOpen, trigger }: Props) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>{trigger?.onOpen}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {children}
          <AlertDialogCancel asChild className="absolute top-2 right-4">
            {trigger?.onClose}
          </AlertDialogCancel>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialogTitle className="flex justify-between items-start mb-4">
      {children}
    </AlertDialogTitle>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => (
  <AlertDialogDescription>{children}</AlertDialogDescription>
);

const Close = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

Modal.Title = Title;
Modal.Content = Content;
Modal.Close = Close;

export default Modal;
