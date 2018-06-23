import React, {Component} from 'react';
import MonthPicker from '../MonthPicker/month-picker.component.jsx';
import Utils from '../../Utils/utils.jsx';
import DashboardActions from '../../actions/dashboardActions.jsx';
import DashboardStore from '../../stores/dashboardStore.jsx';
import Loader from '../Loader/loader.component.jsx';

class AddExpense extends Component{
    constructor(){
        super();

        this.state = {
            monthId: '',
            monthName: '',
            amount: '',
            showLoader: false
        }
    }

    componentDidMount(){
        DashboardStore.addChangeListener('STORE_ADDEXPENSE', this.onAddExpense.bind(this));
    }

    setMonthId(monthDetails){
        this.setState({monthId: monthDetails.id, monthName: monthDetails.name});
    }

    amountChange(e){
        this.setState({amount: e.target.value})
    }

    addExpense(){
        let payload = {};

        payload.expenseId = this.state.monthId;
        payload.userId = Utils.getUserInfo("userInfo").id;
        payload.name = this.state.monthName;
        payload.amount = this.state.amount;
        this.setState({showLoader: true});
        DashboardActions.addExpense(payload);
    }

    onAddExpense(){
        const data = DashboardStore.getAddExpenseStatus();

        this.setState({showLoader: false});
        this.props.onAddExpense(data);
    }

    render(){
        return(
            <div className="modal-window">
                <div className="overlay1" onClick={this.props.bodyClick}>
                </div>

                <div className="addExpenseForm">
                    {this.state.showLoader ? <Loader /> : null}
                    <div className="expenseForm">
                        <div className="field">
                            <label className="spLabel">Month: </label>
                            <MonthPicker monthId={this.state.monthId} setMonthId={this.setMonthId.bind(this)}/>
                        </div>
                        <div className="field">
                            <label className="spLabel">Amount : </label>
                            <input type="text" className="spValue" onChange={this.amountChange.bind(this)}></input>
                        </div>

                        <div className="row action">
                            <button className="btn pull-right" onClick={this.addExpense.bind(this)}>ADD</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddExpense