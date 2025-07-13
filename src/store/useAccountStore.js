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
            username: account.username
            // apellidoUsuario: account.apellidoUsuario,
            // direccionUsuario: account.direccionUsuario,
            // telefonoUsuario: account.telefonoUsuario,
            // correoUsuario: account.correoUsuario,
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