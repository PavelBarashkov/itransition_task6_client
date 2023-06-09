import axios from 'axios';
export class Server {

    //Получение всех пользователей
    static async getAll() {
        const response =  await axios.get('https://itransitiontask6server-production.up.railway.app/api/user/users');
        return response;
    }

    // Получение всех сообщений где он получателя
    static async getMessageSrecipientId(recipientId) {
        const response =  await axios.get(`https://itransitiontask6server-production.up.railway.app/api/message/recipientmessages?recipientId=${recipientId}`);
        return response;
    }

    // Получение всех сообщений где он получателя
    static async getMessagesSenderId(recipientId) {
        const response =  await axios.get(`https://itransitiontask6server-production.up.railway.app/api/message/sendermessages?senderId=${recipientId}`);
        return response;
    }

    static async getMessage(senderid, recipientid, theme, body) {
        const response = await axios.post('https://itransitiontask6server-production.up.railway.app/api/message/getmessage', { senderid, recipientid, theme, body });
        return response;
    }

}