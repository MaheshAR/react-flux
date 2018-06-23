import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddDailyExpense from '../Expense/addDailyExpense.component.jsx';
import DashboardStore from '../../stores/dashboardStore.jsx';
import Notifications, {notify} from 'react-notify-toast';

class ExpenseList extends Component{
    constructor(props){
        super(props);
        this.expenseId = this.props.params.id;
        this.state = {
            expenseId: this.expenseId,
            monthlyExpenses: [],
            showAddExpenseModal: false
        };
    }

    componentDidMount(){
        const expenses = DashboardStore.getExpensesForMonth(this.expenseId);
        let monthlyExpenses = [];

        Object.keys(expenses).forEach(function(exp){
            monthlyExpenses.push(expenses[exp]);
        });
        this.setState({monthlyExpenses: monthlyExpenses});
    }

    back(){
        browserHistory.push('/dashboard');
    }

    onAddDailyExpenseBodyClick(){
        this.setState({showAddExpenseModal: false});
    }

    addDailyExpense(){
        this.setState({showAddExpenseModal: true})
    }

    onAddDailyExpense(res, dailyExpense){
        if(res.success){
            notify.show(res.message);
            let monthlyExpenses = this.state.monthlyExpenses;

            monthlyExpenses.push(dailyExpense);
            this.setState({showLoader: true, showAddExpenseModal: false, monthlyExpenses: monthlyExpenses});
        }
        else{
            const result = JSON.parse(res.responseText);
            notify.show(result.err);
        }
    }
    
    render(){
        const backText = '< Back';
        return(
            <div>
                <Notifications />
                <ReactCSSTransitionGroup transitionName="modal-animation" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                        {this.state.showAddExpenseModal ? <AddDailyExpense expenseId={this.state.expenseId} bodyClick={this.onAddDailyExpenseBodyClick.bind(this)} onAddDailyExpense={this.onAddDailyExpense.bind(this)}/> : null}
                </ReactCSSTransitionGroup>

                <div className="addExpense row">
                    <p className="pull-left back" onClick={this.back.bind(this)}>{backText}</p>
                    <button className="btn pull-right" onClick={this.addDailyExpense.bind(this)}>Add Daily Expense</button>
                </div>

                <div className="dailyExpense">
                    <table>
                        <thead>
                            <th>
                                <td>Day</td>
                            </th>
                            <th>
                                <td>Reason</td>
                            </th>
                            <th>
                                <td>Amount</td>
                            </th>
                        </thead>

                        <tbody>
                            {
                                this.state.monthlyExpenses.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.name}</td>
                                            <td>{data.reason}</td>
                                            <td>{data.amount}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ExpenseList