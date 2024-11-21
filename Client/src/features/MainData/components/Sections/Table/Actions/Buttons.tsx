import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Download, Eye, Pen, Plus, Trash, Upload } from "lucide-react";

export const AddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="bg-blue-700 hover:bg-blue-800 flex justify-center items-center rounded"
        ref={ref}
        {...props}>
        <Plus />
      </Button>
    );
  }
);

export const EditButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-yellow-400 hover:bg-yellow-500 rounded"
        ref={ref}
        {...props}>
        <Pen />
      </Button>
    );
  }
);

export const ShowButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 rounded"
        ref={ref}
        {...props}>
        <Eye />
      </Button>
    );
  }
);

export const DeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-red-600 hover:bg-red-700 rounded"
        ref={ref}
        {...props}>
        <Trash />
      </Button>
    );
  }
);

export const UploadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-green-600 hover:bg-green-700 rounded"
        ref={ref}
        {...props}>
        <Upload />
      </Button>
    );
  }
);

export const DownloadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-blue-800 hover:bg-blue-900 rounded"
        ref={ref}
        {...props}>
        <Download />
      </Button>
    );
  }
);

export const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        variant={"ghost"}
        className="hover:cursor-pointer rounded"
        ref={ref}
        {...props}>
        <Cross1Icon />
      </Button>
    );
  }
);
