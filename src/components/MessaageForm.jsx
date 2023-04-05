import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';



export const MessageForm = ({ value, onChange}) => {

    return (
        <FloatingLabel controlId="floatingTextarea2" label="Сообщение">
        <Form.Control
            value={value}
            onChange={onChange}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '250px', width: 600}}
        />
      </FloatingLabel>
    )
}
