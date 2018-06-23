import AppDispatcher from '../dispatcher/dispatcher.jsx';
import Utils from '../Utils/utils.jsx';

class DashboardActions {
    getExpenses(userID){
        Utils.apicall('/api/getExpenseById/' + userID, 'GET', {}, function(data){
            AppDispatcher.dispatch({
                actionType: 'GETEXPENSE',
                data: data
            })
        });
    }

    addExpense(data){
        Utils.apicall('/api/addExpense','POST', data, function(data){
            AppDispatcher.dispatch({
                actionType: 'ADDEXPENSE',
                data: data
            })    
        });
    }

    addDailyExpense(data, userID, expenseID){
        Utils.apicall(`/api/dailyExpense/${userID}/${expenseID}`, 'POST', data, function(data){
            AppDispatcher.dispatch({
                actionType: 'ADDDAILYEXPENSE',
                data: data
            })    
        });
    }
}

export default new DashboardActions()