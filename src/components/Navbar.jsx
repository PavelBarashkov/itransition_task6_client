import React, { useContext } from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { MAIN_ROUTE } from '../utils/consts';


export const NavBar = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const isMain = location.pathname === MAIN_ROUTE;

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate('/login')
    }
  
      const main = () => {
        navigate('/main')
      }

      const clickSwitch = () => {
          navigate('/message')
      }
      return (
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="#home">Task#6</Navbar.Brand>
                  {isMain ? (
                      <Nav className="mo-auto align-items-center">
                          <Nav.Link onClick={clickSwitch}>
                              <Button variant="warning">Написать</Button>
                          </Nav.Link>
                          {localStorage.getItem('token') && (
                              <Nav.Link onClick={logOut}> Выйти </Nav.Link>
                          )}
                      </Nav>
                  ) : (
                      <Nav className="mo-auto align-items-center">
                          {localStorage.getItem('token') ? (
                              <Nav.Link onClick={main}>
                                  <Button variant="warning">Главная</Button>
                              </Nav.Link>
                      ) : null}
                          {localStorage.getItem('token') && (
                              <Nav.Link onClick={logOut}> Выйти </Nav.Link>
                          )}
                      </Nav>
                  )}
            
                  {!localStorage.getItem('token') && (
                      <Nav className="mo-auto align-items-center">
                          <Nav.Link> Войти </Nav.Link>
                      </Nav>
                  )}
              </Container>
          </Navbar>
      );
}