import { instanceAxios } from './axios'
import { toast } from 'react-toastify'

export const authApi = {
    getAccountStatus(data) {
        const accountPromise = instanceAxios.get(
            `waInstance${data.id}/getStateInstance/${data.apiToken}`
        )
        toast.promise(
            accountPromise,
            {
                pending: 'Request is pending',
                success: 'Succesfull request',
                error: 'Request failed'
            }
        )
        return accountPromise
    },
    getAccountSettings(data) {
        const settingsPromise = instanceAxios.get(`waInstance${data.id}/getSettings/${data.apiToken}`);
        toast.promise(
            settingsPromise,
            {
                pending: 'Request is pending',
                success: 'Succesfull request',
                error: 'Request failed'
            }
        )
        return settingsPromise
    },
};




