import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import React from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";

// Komponen fallback yang ditampilkan saat error terjadi
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex flex-col gap-2 h-screen w-full justify-center items-center"
      role="alert">
      <AlertCircle className="size-[3rem] text-[red]" />
      <h2 className="text-4xl font-bold">Oops, ada yang salah!</h2>
      <p className="text-xl">{error.message}</p>
      <Button
        variant={"secondary"}
        onClick={resetErrorBoundary}
        className="rounded ">
        Coba lagi
      </Button>
    </div>
  );
}

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
