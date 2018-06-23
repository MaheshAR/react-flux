import React, {Component} from 'react';
import Utils from '../../Utils/utils.jsx';
import DashboardActions from '../../actions/dashboardActions.jsx';
import DashboardStore from '../../stores/dashboardStore.jsx';
import Loader from '../Loader/loader.component.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as _ from 'lodash';

class AddDailyExpense extends Component{
    constructor(props){
        super(props);

        this.expenseId = this.props.expenseId;
        this.dailyExpense = {};

        this.year = parseInt(this.expenseId.substring(0,4));
        this.month = parseInt(this.expenseId.substring(4, this.expenseId.length));
        this.noOfDays = new Date(this.year, this.month, 0).getDate();

        this.currentDate = moment();
        this.yearDiff = this.year - this.currentDate.year();
        this.monthDiff = this.month - this.currentDate.month();
        this.dayDiff = this.currentDate.date() - 1;

        this.currentDate = this.currentDate.add(this.yearDiff, "years");
        this.currentDate = this.currentDate.add(this.monthDiff - 1, "months");


        this.minDate = _.cloneDeep(this.currentDate.add(-this.dayDiff, "days"));
        this.maxDate = _.cloneDeep(this.currentDate.add(this.noOfDays - 1, "days"));

        this.state = {
            amount: null,
            reason: null,
            showLoader: false,
            startDate: null,
            minDate: this.minDate,
            maxDate: this.maxDate
        };
    }

    componentDidMount(){
        DashboardStore.addChangeListener('STORE_ADDDAILYEXPENSE', this.onAddDailyExpense.bind(this));
    }

    amountChange(e){
        this.setState({amount: e.target.value})
    }

    reasonChange(e){
        this.setState({reason: e.target.value})
    }

    addDailyExpense(){
        //this.dailyExpense = {};

        //dailyExpense.name = this.state.startDate._d.toLocaleString("en-us", {month: "long"});
        this.dailyExpense.name = this.state.startDate._d.toLocaleDateString();
        this.dailyExpense.dailyExpenseId = this.state.startDate.date();
        this.dailyExpense.amount = parseInt(this.state.amount);
        this.dailyExpense.reason = this.state.reason;

        this.setState({showLoader: true});
        DashboardActions.addDailyExpense(this.dailyExpense, Utils.getUserInfo("userInfo").id, this.props.expenseId);
    }
    
    handleChange(date){
        this.setState({
            startDate: date
        });
    }

    onAddDailyExpense(){
        const data = DashboardStore.getDailyExpenseStatus();

        this.setState({showLoader: false});
        this.props.onAddDailyExpense(data, this.dailyExpense);
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
                            <label className="spLabel">Date : </label>
                            <DatePicker forceShowMonthNavigation={false} minDate={this.state.minDate} maxDate={this.state.maxDate} selected={this.state.startDate} onChange={this.handleChange.bind(this)} />
                        </div>

                        <div className="field">
                            <label className="spLabel">Amount : </label>
                            <input type="text" className="spValue" onChange={this.amountChange.bind(this)}></input>
                        </div>

                        <div className="field">
                            <label className="spLabel">Reason : </label>
                            <input type="text" className="spValue" onChange={this.reasonChange.bind(this)}></input>
                        </div>

                        <div className="row action">
                            <button className="btn pull-right" onClick={this.addDailyExpense.bind(this)}>ADD</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddDailyExpense