import React, { Component } from 'react';
import AuthenticationActions from '../../actions/authenticationActions.jsx';
import AuthenticationStore from '../../stores/authenticationStore.jsx';
import Loader from '../Loader/loader.component.jsx';
import Notifications, {notify} from 'react-notify-toast';
import { browserHistory } from 'react-router';
import Utils from '../../Utils/utils.jsx';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            showLoader: false
        }
    }

    componentDidMount(){
        AuthenticationStore.addChangeListener('STORE_LOGIN', this.onLogin.bind(this));
    }

    componentWillUnmount(){
        //AuthenticationStore.removeChangeListener('STORE_LOGIN', this.onLogin.bind(this));
    }

    onUserNameChange(e){
        this.setState({userName: e.target.value})
    }

    onPasswordChange(e){
        this.setState({password: e.target.value})
    }

    login(e){
        e.preventDefault();
        var data = {
            username: this.state.userName,
            password: this.state.password
        };

        this.setState({showLoader: true});
        AuthenticationActions.login(data);
    }

    onLogin(){
        let loginStatus = AuthenticationStore.getLoginStatus();

        this.setState({showLoader: false});
        Utils.setUserInfo(loginStatus.result);
        loginStatus.success ? browserHistory.push('/dashboard') : notify.show(loginStatus.responseJSON.err);
    }

    register(){
        browserHistory.push('/register');
    }

    render(){
        return (
            <div className="loginPage">
                <Notifications />
                <div className="loginContainer">
                    {this.state.showLoader ? <Loader /> : null}
                    
                    <h4 className="loginHeader">Login</h4>
                    <div className="loginForm">
                        <form action="" >
                            <div className="inputForm">
                                <span className="inputLabel">User name:</span>
                                <input className="inputField" type="text" required onChange={this.onUserNameChange.bind(this)} value={this.state.userName}/>
                            </div>
                            <div className="inputForm">
                                <span className="inputLabel">Password:</span>
                                <input className="inputField" type="password" required onChange={this.onPasswordChange.bind(this)} value={this.state.password}/>
                            </div>

                            <div className="actionContainer row">
                                <span className="pull-left register" onClick={this.register.bind(this)}>Register</span>
                                <button className="btn pull-right" type="submit" onClick={this.login.bind(this)}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login