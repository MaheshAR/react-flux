import React, {Component} from 'react';
import DashboardActions from '../../actions/dashboardActions.jsx';
import DashboardStore from '../../stores/dashboardStore.jsx';
import Loader from '../Loader/loader.component.jsx';
import Utils from '../../Utils/utils.jsx';
import AddExpense from '../Expense/addExpense.component.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Notifications, {notify} from 'react-notify-toast';
import { browserHistory } from 'react-router';

class Expense extends Component{
    constructor(props){
        super(props);
        this.userInfo = Utils.getUserInfo();
        this.state = {
            expenseList: [],
            showLoader: true,
            showAddExpenseModal: false
        }
        this.userID = this.userInfo.id;
    }

    componentDidMount(){
        this.setState({showLoader: true});
        DashboardStore.addChangeListener('STORE_DASHBOARDEXPENSELIST', this.onLoad.bind(this));
        DashboardActions.getExpenses(this.userID);
    }

    onLoad(){
        let expenseList = DashboardStore.getExpenseList();

        this.setState({expenseList: expenseList, showLoader: false});
    }

    addExpense(){
        this.setState({showAddExpenseModal: true});
    }

    onAddExpenseBodyClick(){
        this.setState({showAddExpenseModal: false});
    }

    onAddExpense(res){
        if(res.success){
            notify.show(res.message);
            this.setState({showLoader: true, showAddExpenseModal: false});
            DashboardActions.getExpenses(this.userID);
        }
        else{
            const result = JSON.parse(res.responseText);
            notify.show(result.err);
        }
    }

    expenseList(id){
        browserHistory.push('/dashboard/'+id)
    }

    render(){
        return(
            <div>
                {this.state.showLoader ? <Loader /> : null}
                <Notifications />

                <div className="dashboardContent">
                    <ReactCSSTransitionGroup transitionName="modal-animation" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                        {this.state.showAddExpenseModal ? <AddExpense bodyClick={this.onAddExpenseBodyClick.bind(this)} onAddExpense={this.onAddExpense.bind(this)}/> : null}
                    </ReactCSSTransitionGroup>

                    <div className="addExpense row">
                        <button className="btn pull-right" onClick={this.addExpense.bind(this)}>Add Expense</button>
                    </div>

                    {
                        this.state.expenseList.length > 0 ? 
                            <div className="expenseList">
                                <ul className="list clearfix">
                                    {
                                        this.state.expenseList.map((data, index) => {
                                            return (
                                                <li key={index} onClick={this.expenseList.bind(this, data.expenseId)}>
                                                    <h4>
                                                        {data.name}
                                                    </h4>
                                                    <p>Total Expense: {data.amount}</p>
                                                    <p>Remaining Amount: {data.remainingAmount}</p>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            <h4 className="addExpenseTitle">No Expense to show, add expense</h4>
                    }

                </div>
            </div>
        );
    }
}

export default Expense