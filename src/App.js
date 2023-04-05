import './App.css';
import { observer } from "mobx-react-lite";
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { NavBar } from './components/Navbar';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './API/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const user = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  }, [])

  if (loading) {
    return <Spinner animation={'grow'}/>
  }
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
