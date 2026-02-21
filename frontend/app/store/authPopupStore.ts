import { create } from "zustand";

type AuthPopupState = {
  show: boolean;
  message: string;
  open: (msg: string) => void;
  close: () => void;
};

export const useAuthPopup = create<AuthPopupState>((set) => ({
  show: false,
  message: "",
  open: (msg) => set({ show: true, message: msg }),
  close: () => set({ show: false, message: "" }),
}));