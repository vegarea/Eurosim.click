import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};