"use client";

import { SidebarView, useAppStore } from "@/app/state";
import FileExplorer from "./FileExplorer";
import Settings from "./Settings";
import { ExpNodeType } from "@/types/explorer";
import { store } from "@/state";

function Sidebar() {
  const { sidebar } = useAppStore();
  const { explorer } = store.getSnapshot().context;

  if (sidebar === SidebarView.SETTINGS) {
    return <Settings />;
  }

  return (
    <div className="">
      <FileExplorer root={explorer} />
    </div>
  );
}

function SidebarLayout() {
  return (
    <div className="w-[300px] border-r bg-card h-full px-3 pt-2">
      <Sidebar />
    </div>
  );
}

export default SidebarLayout;
