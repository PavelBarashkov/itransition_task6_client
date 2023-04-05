import React, { useState, useEffect } from "react";
import '../App.css'
import { SenderInfo } from './SenderInfo ';
import { RecipientInfo } from './RecipientInfo';
import axios from 'axios';

export const ListMessages = ({ data, onClick, showSender, showRecipient }) => {
  const [senderName, setSenderName] = useState({});
  const [recipientName, setRecipientName] = useState({});

  useEffect(() => {
    const getSenderName = async (senderId) => {
      try {
        const response = await axios.get(`https://task-4-client-rbhe.onrender.com/api/user/user/${senderId}`);
        setSenderName(prevState => ({
          ...prevState,
          [senderId]: response.data.name
        }));
      } catch (error) {
        console.error(error);
      }
    };

    data.forEach(message => {
      if (!senderName[message.senderid]) {
        getSenderName(message.senderid);
      }
    });
  }, [data, senderName]);



  useEffect(() => {
    const getRecipientName = async (recipientId) => {
      try {
        const response = await axios.get(`https://task-4-client-rbhe.onrender.com/api/user/user/${recipientId}`);
        setRecipientName(prevState => ({
          ...prevState,
          [recipientId]: response.data.name
        }));
      } catch (error) {
        console.error(error);
      }
    };
  
    data.forEach(message => {
      if (!recipientName[message.recipientid]) {
        getRecipientName(message.recipientid);
      }
    });
  }, [data, recipientName]);

  const Message = ({ message, showSender, showRecipient }) => {
    const sender = senderName[message.senderid];
    const recipient = recipientName[message.recipientid];
    console.log(sender)
    console.log(recipient)

    return (
      <div
        className="list"
        style={{
          borderBottom: '1px solid rgb(189 198 206)',
          cursor: 'pointer',
          marginBottom: 10,
          paddingBottom: 2
        }}
        key={message.id}
        onClick={onClick}
        data-id={message.id}
        data-theme={message.theme}
        data-body={message.body}
        data-createmessage={message.createMessage}
      >
        {showSender && <SenderInfo sender={message.sender} />}
        {showRecipient && <RecipientInfo recipient={message.recipient} />}
        <span style={{ fontWeight: 'bold' }}>Тема: </span>{message.theme}
        <div>
          <span style={{ fontWeight: 'bold' }}> Дата: </span> {message.createMessage}
        </div>
        {showSender && (
          <div>
            <span style={{ fontWeight: 'bold' }}>От кого: </span>
            {sender}
          </div>
        )}
        {showRecipient && (
          <div>
            <span style={{ fontWeight: 'bold' }}>Кому: </span>
            {recipient}
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div>
      {data && data.map(message => (
        <Message
          key={message.id}
          message={message}
          showSender={showSender}
          showRecipient={showRecipient}
        />
      ))}
    </div>
  );
};