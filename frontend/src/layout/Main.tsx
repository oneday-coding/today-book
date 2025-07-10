import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="absolute top-[64px] left-0 right-0 bottom-0 w-full flex-1 overflow-y-auto p-[16px] pb-[95px]">
      {children}
    </main>
  );
}
