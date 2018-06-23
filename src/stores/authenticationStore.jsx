import AppDispatcher from '../dispatcher/dispatcher.jsx';
import { EventEmitter } from 'events';

let loginStatus = {};
let registerStatus = {};

class AuthenticationStore extends EventEmitter{
    constructor(){
        super();
        this.dispatcher = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    addChangeListener(eventName, callback){
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback){
        this.removeChangeListener(eventName, callback);
    }

    emitChange(eventName){
        this.emit(eventName);
    }

    getLoginStatus(){
        return loginStatus;
    }

    getRegisterStatus(){
        return registerStatus;
    }

    dispatcherCallback(action){
        switch(action.actionType){
            case 'LOGIN': 
                loginStatus = action.data;
                this.emitChange('STORE_LOGIN');
                break;

            case 'REGISTER':
                registerStatus = action.data;
                this.emitChange('STORE_REGISTER');
                break;
        }
    }
}

export default new AuthenticationStore();