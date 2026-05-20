import type { ReactNode } from "react";

import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";

type Props = {
  children: ReactNode;
};

export function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
