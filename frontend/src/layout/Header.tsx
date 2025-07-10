import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="layout-header">
      {children}
    </div>
  );
}