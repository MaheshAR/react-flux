import AppDispatcher from '../dispatcher/dispatcher.jsx';
import Utils from '../Utils/utils.jsx';

class AuthenticationActions {
    login(data){
        Utils.apicall('/api/login', 'POST', data, function(data){
            AppDispatcher.dispatch({
                actionType: 'LOGIN',
                data: data
            })
        });
    }

    register(data){
        Utils.apicall('/api/register', 'POST', data, function(data){
            AppDispatcher.dispatch({
                actionType: 'REGISTER',
                data: data
            })
        });
    }
}

export default new AuthenticationActions()