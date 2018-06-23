import React, {Component} from 'react';
import Picker from 'react-month-picker';

class MonthPicker extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'Select month',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            years: [2017, 2018, 2019, 2020],
            mValue: {year: 2017},
            monthId: this.props.monthId
        };
    }

    handleClickMonthBox(e) {
        this.refs.pickAMonth.show()
    }

    handleAMonthDissmis(value){
        let text = "", monthDetails = {};

        if (value && value.year && value.month) {
            text = (this.state.months[value.month-1] + '. ' + value.year);
            this.setState({mValue: value, value: text});
            monthDetails.id = parseInt(value.year + '' + value.month);
            monthDetails.name = text;
            this.props.setMonthId(monthDetails); 
        }
    }

    render(){
        return(
            <div className="edit">
                <Picker
                    ref="pickAMonth"
                    years={this.state.years}
                    value={this.state.mValue}
                    lang={this.state.months}
                    onChange={this.handleAMonthChange}
                    onDismiss={this.handleAMonthDissmis.bind(this)}
                    >
                    <div className="monthDisplay" onClick={this.handleClickMonthBox.bind(this)}>
                        <label>{this.state.value}</label>
                    </div>
                </Picker>
            </div>
        );
    }
}

export default MonthPicker