import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { login } from "../API/userAPI";



export const Login = () => {
    const {user} = useContext(Context);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const click = async () => {
        try {
            let data;
            data = await login(name);
            await user.setUser(user);
            await user.setIsAuth(true);
            navigate('/message');
        } catch(e){
            alert(e.response.data.message)
        }
    }


    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 400}} className='p-5'>
                <h2 className="m-auto ">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                    />
                    <Button
                        onClick={click}
                        className="mt-3"
                        variant="warning"
                    >
                        Войти
                    </Button>   
                </Form>
            </Card>
        </Container>
    )
}