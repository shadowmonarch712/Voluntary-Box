import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AuthProvider from './Context/Auth';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Pages/Profile';
import AddItem from './Components/AddItem';
import ItemSummary from './Components/ItemSummary';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/Profile' component={Profile} />
          <PrivateRoute exact path='/AddItem' component={AddItem} />
          <PrivateRoute exact path='/ItemSummary' component={ItemSummary} />
          <Route exact path='/Register' component={Register} />
          <Route exact path='/Login' component={Login} />

        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
