import React from "react"
import { Form } from "react-bootstrap"

export const FormLisUsers = ({value, onChange}) => {

    return (
        <Form.Control
            value={value}
            onChange={onChange}
            style={{ width: "auto" }}
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
        />
    )
}