import React, { Component } from 'react';
import AuthenticationActions from '../../actions/authenticationActions.jsx';
import AuthenticationStore from '../../stores/authenticationStore.jsx';
import Loader from '../Loader/loader.component.jsx';
import Notifications, {notify} from 'react-notify-toast';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            showLoader: false
        }
    }

    componentDidMount(){
        AuthenticationStore.addChangeListener('STORE_REGISTER', this.onRegister.bind(this))
    }

    componentWillUnmount(){
        //AuthenticationStore.removeChangeListener('STORE_REGISTER', this.onRegister.bind(this));
    }

    onUserNameChange(e){
        this.setState({userName: e.target.value})
    }

    onPasswordChange(e){
        this.setState({password: e.target.value})
    }

    register(e){
        e.preventDefault();
        var data = {
            username: this.state.userName,
            password: this.state.password
        };

        this.setState({showLoader: true});
        AuthenticationActions.register(data);
    }

    onRegister(){
        let loginStatus = AuthenticationStore.getRegisterStatus();

        this.setState({showLoader: false});
        loginStatus.success ? notify.show('Successfully Register') : notify.show(loginStatus.responseJSON.err);
    }

    render(){
        return (
            <div className="loginPage">
                <Notifications />
                <div className="loginContainer">
                    {this.state.showLoader ? <Loader /> : null}
                    
                    <h4 className="loginHeader">Register</h4>
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
                                <button className="btn pull-right" type="submit" onClick={this.register.bind(this)}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register