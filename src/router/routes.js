import { MAIN_ROUTE, LOGIN_ROUTE, MESSAGE_ROUTE } from '../utils/consts'
import { Main } from '../pages/Main'
import { Message } from '../pages/Message'
import { Login } from '../pages/Login';


export const privateRoutes = [
    {path: MAIN_ROUTE, element: <Main/>},
    {path: MESSAGE_ROUTE, element: <Message/>},
    {path: '/*', element: <Main/>}
];

export const publcRoutes = [
    {path: LOGIN_ROUTE, element: <Login/>},
    {path: '/*', element: <Login/>}
]