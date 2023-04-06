
import { useEffect, useState } from "react"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import { Server } from "../API/Server";
import { ListUsers } from "../components/ListUsers";
import { MyModal } from "../components/UI/MyModal/MyModal"
import { useFetching } from "../hooks/useFetching";
import { InputFieldGroup } from "../components/InputFieldGroup";
import { ListMessages} from "../components/ListMessages"
import jwtDecode from "jwt-decode";
import { FormLisUsers } from "../components/FormListUsers";
import { MessageForm } from "../components/MessaageForm";
import { useNavigate } from "react-router-dom";
import { Autocompletes } from "../components/Autocomplete";





export const Message = () => {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({}); 
    const userId = jwtDecode(localStorage.getItem('token'));
    const [arrMessage, setArrMessage] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [inputTheme, setInputTheme] = useState('');
    const [textMessage, setTextMessage] = useState('')
    const navigate = useNavigate();
    const [fetchUsers, isUserLoading, userError] = useFetching( async()=> {
        const response =  await Server.getAll();
        setUsers(response.data);
    })
    const [recipient, isRecipientLoading, recipientError] = useFetching(async()=> {
        const response =  await Server.getMessageSrecipientId(selectedUser.id);
        const arr = response.data.messages.filter(item => item.senderid === userId.id)
        setArrMessage(arr);
    });
    const wsConnection = new WebSocket("ws://task-6-server-kfn7.onrender.com:8999");


    useEffect(() => {
        wsConnection.onopen = () => {
            console.log("Соединение установлено. Message");
        }
        fetchUsers();
    }, []);
      
    useEffect(() => {
        setArrMessage([]);
        if (selectedUser && selectedUser.id) {
          recipient();
        } 
      }, [selectedUser]);

    function clickName(user) {
        setSelectedUser({ id: user.id, name: user.name });
    }

    function handleSelectMessage(data) {
        setSelectedMessage(data ? { theme: data.theme, body: data.body, createmessage: data.createmessage } : null);
      }

    const renderSuggestion = (suggestion) => {
        return <div>{suggestion.name}</div>;
      }

    function sendMessage() {
        Server.getMessage(userId.id, selectedUser.id, inputTheme, textMessage);
        const date = new Date();
        wsConnection.send(JSON.stringify({
            event: 'message',
            id: userId.id,
            recipient: selectedUser.id,
            theme: inputTheme,
            body: textMessage,
            createMessage: date.toLocaleString(),
            
        }))
        setTextMessage('');
        setInputTheme('');

    }
    function handleUserSelect(user) {
        setSelectedUser(user);
      }

    console.log(selectedUser)
    return (
        <Container>
            <h1 style={{textAlign:'center', color:'white', marginBottom: 35}}> Отправить сообщение </h1>
            <div className="d-flex  justify-content-between">
                <div 
                    style={
                        {maxWidth: 500, 
                        background: 'rgb(233 236 239)', 
                        padding: 15, 
                        borderRadius: 8
                        }
                    }>
                    <Autocompletes 
                        data={users} 
                        onUserSelect={handleUserSelect} 
                    />
                    <MyModal 
                        visible={modal} 
                        setVisible={setModal} 
                    >
                        <ListUsers 
                            data={users}  
                            clickName={clickName}
                        />
                    </MyModal>
                

                    <InputFieldGroup 
                        inputValue={inputTheme}
                        onChangeTheme={event => setInputTheme(event.target.value)}
                        onClick={() => setModal(true)}
                    /> 
                    <h5>Отправленные сообщения</h5>
                    <ListMessages 
                            data={arrMessage}
                            onClick={(event) => {
                                handleSelectMessage(event.currentTarget.dataset)
                                setModal2(true)
                            }}
                    />
                </div>

            

                <div>
                    
               
                    <MessageForm 
                        value={textMessage}
                        onChange={event => setTextMessage(event.target.value)}
                    />
                    <Button 
                        style={{marginTop: 15}}
                        variant="warning"
                        onClick={() =>  sendMessage()}
                    >
                        отправить
                    </Button>
                    <MyModal visible={modal2} setVisible={setModal2}>
                        
                        <h4>Кому: {selectedUser?.name}</h4>
                        <div className="d-flex justify-content-between" style={{width: 500, marginBottom: 35}}>
                            <div><span style={{fontWeight: 'bold'}}>Тема: </span>{selectedMessage?.theme}</div>
                            <div> <span style={{fontWeight: 'bold'}}>Дата:</span> {selectedMessage?.createmessage}</div>
                        </div>                                                              
                        <div>
                            <span style={{fontWeight: 'bold'}}>Сообщение:</span> {selectedMessage?.body}
                        </div>
                        </MyModal>
                </div>    
            </div>
        </Container>
    )
}