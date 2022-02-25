import Navbar from '../navi/Navbar';
import {Route, Switch} from 'react-router-dom';
import Main from '../main/Main';
import Login from '../login/Login';
import Register from '../register/Register';
import './app.css';
import Profile from '../profile/Profile';
import Footer from '../footer/Footer';
import NotFound from '../common/NotFound';
import 'animate.css';
import Companies from "../companies/Companies";

const App = () => {
    return (
        <>
            <Navbar/>
            <div className="container-app">
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login" exact component={Login}/>{' '}
                    <Route path="/companies" exact component={Companies}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/user/:id" exact component={Profile}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
            <Footer/>
        </>
    );
};

export default App;
