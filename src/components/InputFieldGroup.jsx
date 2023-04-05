import React from "react"
import { InputGroup, Form } from "react-bootstrap"


export const InputFieldGroup = ({inputValue, onChangeTheme}) => {

    return (
        <InputGroup className="mt-3 mb-3" style={{width: 350}}>
            <Form.Control
                id='input_theme'
                placeholder="Тема"
                style={{width: 150}}
                value={inputValue}
                onChange={onChangeTheme}
            />
        </InputGroup>
    )
}