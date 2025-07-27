import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAccountStore = create(
  persist(
    (set, get) => ({
      account: null,
      admin: false,

      setCurrent: (account) =>
        set({
          account: {
            id_user: account.id_user,
            username: account.username,
            email: account.email,
            role: account.role,
            enabled: account.enabled
          },
          admin: account.role === "ADMIN"
        }),

      unsetCurrent: () =>
        set({
          account: null,
          admin: false
        })

    }), {
    name: "account"
  }
  )
)