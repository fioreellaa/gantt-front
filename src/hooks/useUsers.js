import { getUser, saveUser, findAccount } from "../services/userCalls";
import { useAccountStore } from "../store/useAccountStore";

export const useUsers = () => {
    const { account, admin, setCurrent, unsetCurrent } = useAccountStore()

    return {
        account,
        admin,

        getUser: async () => {
            const [data, error] = await getUser()
            if (error) {
                //console.log(error);
                return []
            }
            return [data]
        },

        saveUser: async (body) => {

            const json = {
                email: body.email,
                username: body.username,
                password: body.password,
            }

            const [data, error] = await saveUser(json)

            if (error) {
                //console.log(error);
                return false;
            } else if (data.id_user > 0) {
                //console.log("User created successfully:", data);
                return true;
            }
            return true;
        },

        loginUser: async (body) => {
            const json = {
                username: body.username,
                password: body.password,
            }

            const [data, error] = await findAccount(json)
            if (error) {
                //console.log(error);
                return { data: null, error };
            }

            if (data?.id_user > 0) {
                return { data, error: null };
            }

            return { data: null, error: new Error("Usuario no encontrado") };
        }
    }
}