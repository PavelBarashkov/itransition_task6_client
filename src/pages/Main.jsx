import React, {useEffect, useState, useContext} from "react";
import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Server } from "../API/Server";
import jwtDecode from "jwt-decode";
import { useFetching } from "../hooks/useFetching";
import { ListMessages } from "../components/ListMessages"
import { MyModal } from "../components/UI/MyModal/MyModal";
import { BasicExample } from "../components/BasicExample";



export const Main = () => {
    const navigate = useNavigate();
    const userId = jwtDecode(localStorage.getItem('token'));
    const [recipientMessages, setRecipientMessages] = useState([]);
    const [senderMessages, setSenderMessages] = useState([]);
    const [modalRecipient, setModalRecipient] = useState(false);
    const [modalSender, setModalSender] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [lastShownMessage, setLastShownMessage] = useState(null);
    

   


    const [fetchRecipient, isRecipientLoading, recipientError] = useFetching(async()=> {
        const response =  await Server.getMessageSrecipientId(userId.id);
        const sortMessages = response?.data?.messages.sort((a, b) => a.id - b.id)
        setRecipientMessages(sortMessages);
        const lastMessage = response?.data?.messages?.[response?.data?.messages?.length - 1];
        if (lastMessage && lastMessage.theme && lastMessage !== lastShownMessage) {
            setLastShownMessage(lastMessage);
        }
    });
    const [fetchSender, isSenderLoading, senderError] = useFetching( async () => {
        const response = await Server.getMessagesSenderId(userId.id);
        const sortMessages = response?.data?.messages.sort((a, b) => a.id - b.id)
        setSenderMessages(response?.data?.messages)
    })

   
      
    useEffect(() => {
        const wsConnection = new WebSocket("ws://localhost:8999");

        wsConnection.onopen = () => {
            const message = {
                event: 'connection',
                username: userId.name,
                id: userId.id
            }
            wsConnection.send(JSON.stringify(message))
            console.log("Соединение установлено.");
            
        }

        wsConnection.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setLastShownMessage(message);
            console.log(message)
            setShowToast(true)
        }


        wsConnection.onclose = () => {
            console.log('сокет закрыт');
        }

        wsConnection.onerror = () => {
            console.log('сокет произошла ошибка');

        }
         const wsSend = function(data) {
            if(!wsConnection.readyState){
                setTimeout(function (){
                    wsSend(data);
                },100);
            } else {
                wsConnection.send(data);
            }
        };



        fetchRecipient();
        fetchSender();
    }, [])


    function handleSelectMessage(data) {
        setSelectedMessage(data ? { theme: data.theme, body: data.body, createmessage: data.createmessage } : null);
      }
      if (showToast) {
        setTimeout(() => {
            setShowToast(false)
            fetchRecipient();
            fetchSender();
        }, 15000)
      }
    


    const lastMessage = recipientMessages[recipientMessages.length - 1];

function handleCloseToast() {
    setShowToast(false);

  }
    return (
        <Container>
            <div style={
                        {maxWidth: 500, 
                        background: 'rgb(233 236 239)', 
                        padding: 15, 
                        borderRadius: 8,
                        marginBottom: 25,
                        marginTop: 25
                        }}>
                <h4> Полученные  сообщения </h4>
                {isRecipientLoading
                    ?<div>Загрузка</div>
                    :  
                        <div>
                                        

                            <ListMessages 
                            
                                data={recipientMessages}
                                showSender={true} 
                                onClick={(event) => {
                                handleSelectMessage(event.currentTarget.dataset)
                                setModalRecipient(true)
                                }}
                            /> 
                            <MyModal visible={modalRecipient} setVisible={setModalRecipient}>
                                <div className="d-flex justify-content-between" style={{width: 500, marginBottom: 35}}>
                                    <div><span style={{fontWeight: 'bold'}}>Тема: </span>{selectedMessage?.theme}</div>
                                   <div> <span style={{fontWeight: 'bold'}}>Дата:</span> {selectedMessage?.createmessage}</div>
                                </div>                                                              
                                <div><span style={{fontWeight: 'bold'}}>Сообщение:</span> {selectedMessage?.body}</div>
                            </MyModal>
                        </div> 
                     
                }
            </div>
            <div style={
                        {maxWidth: 500, 
                        background: 'rgb(233 236 239)', 
                        padding: 15, 
                        borderRadius: 8
                        }}>
                <h4>Отправелнные  сообщения</h4>

                {isSenderLoading
                        ?<div>Загрузка</div>
                        :  
                            <div>
                                <ListMessages 
                                    data={senderMessages}
                                    showRecipient={true}
                                    onClick={(event) => {
                                    handleSelectMessage(event.currentTarget.dataset)
                                    setModalRecipient(true)
                                    }}
                                /> 
                                <MyModal visible={modalSender} setVisible={setModalSender}>
                                    <div className="d-flex justify-content-between" style={{width: 500}}>
                                        <span>Тема: {selectedMessage?.theme}</span>
                                        <span>Дата: {selectedMessage?.createmessage}</span>
                                    </div>                                                              
                                    <div>{selectedMessage?.body}</div>
                                </MyModal>
                            </div> 
                    }

            </div>
            
                
            <div style={{ position: 'absolute', bottom: '0', right: '1%' }}>
                {showToast &&
                    <BasicExample 
                        data={lastShownMessage} 
                        onClose={handleCloseToast} 
                    />
                }

            </div>
            
        </Container>
    )
}   