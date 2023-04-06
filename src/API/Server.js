import axios from 'axios';
export class Server {

    //Получение всех пользователей
    static async getAll() {
        const response =  await axios.get('https://test-server-h60h.onrender.com/api/user/users');
        return response;
    }

    // Получение всех сообщений где он получателя
    static async getMessageSrecipientId(recipientId) {
        const response =  await axios.get(`https://test-server-h60h.onrender.com/api/message/recipientmessages?recipientId=${recipientId}`);
        return response;
    }

    // Получение всех сообщений где он получателя
    static async getMessagesSenderId(recipientId) {
        const response =  await axios.get(`https://test-server-h60h.onrender.com/api/message/sendermessages?senderId=${recipientId}`);
        return response;
    }

    static async getMessage(senderid, recipientid, theme, body) {
        const response = await axios.post('https://test-server-h60h.onrender.com/api/message/getmessage', { senderid, recipientid, theme, body });
        return response;
    }

}