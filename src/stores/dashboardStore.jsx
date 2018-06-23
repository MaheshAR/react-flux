import AppDispatcher from '../dispatcher/dispatcher.jsx';
import { EventEmitter } from 'events';

let expenseList = [];
let addExpenseStatus = {};
let addDailyExpenseStatus = {};

class DashboardStore extends EventEmitter{
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

    getExpenseList(){
        expenseList.forEach(expense => {
            let remainingAmount = 0;
            Object.keys(expense.expense).forEach(exp => {
                if(expense.expense[exp].amount){
                    remainingAmount = remainingAmount + parseInt(expense.expense[exp].amount);
                }
            });

            expense.remainingAmount = parseInt(expense.amount) - remainingAmount;
        })

        return expenseList;
    }

    getAddExpenseStatus(){
        return addExpenseStatus;
    }

    getExpensesForMonth(id){
        let expenseList = this.getExpenseList();

        return expenseList.filter(function(a){
            return a.expenseId === id
        })[0].expense;
    }

    getDailyExpenseStatus(){
        return addDailyExpenseStatus;
    }

    dispatcherCallback(action){
        switch(action.actionType){
            case 'GETEXPENSE': 
                expenseList = action.data.result;
                this.emitChange('STORE_DASHBOARDEXPENSELIST');
                break;
            
            case 'ADDEXPENSE':
                addExpenseStatus = action.data;
                this.emitChange('STORE_ADDEXPENSE');
                break;

            case 'ADDDAILYEXPENSE':
                addDailyExpenseStatus = action.data;
                this.emitChange('STORE_ADDDAILYEXPENSE')
        }
    }
}

export default new DashboardStore();