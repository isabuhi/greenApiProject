import { instanceAxios } from './axios'
import { toast } from 'react-toastify'

export const chatApi = {
    sendMessage(data) {
        const sendPromise = instanceAxios.post(`waInstance${data.id}/sendMessage/${data.apiToken}`, {
            chatId: data.chatId,
            message: data.message,
        });

        toast.promise(
            sendPromise,
            {
                error: 'Request failed'
            }
        )
        return sendPromise;
    },
    receiveMessage(data) {
        const receivePromise = instanceAxios.get(
            `waInstance${data.id}/ReceiveNotification/${data.apiToken}`
        );
        toast.promise(
            receivePromise,
            {
                error: 'Receiving notification interupted!'
            }
        )
        return receivePromise;
    }
};
