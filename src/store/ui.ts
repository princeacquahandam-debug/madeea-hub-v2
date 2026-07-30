import { create } from "zustand";

const COLLAPSE_KEY = "madeea:sidebar-collapsed";

function initialCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(COLLAPSE_KEY) === "1";
}

// Shared UI state — the mobile sidebar drawer (so the guided tour can open it)
// and the desktop sidebar collapsed/expanded state (persisted).
interface UIState {
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUI = create<UIState>((set, get) => ({
  navOpen: false,
  setNavOpen: (v) => set({ navOpen: v }),
  sidebarCollapsed: initialCollapsed(),
  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    if (typeof window !== "undefined") window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
    set({ sidebarCollapsed: next });
  },
}));
