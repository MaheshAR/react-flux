import React, {Component} from 'react';
import Utils from '../../Utils/utils.jsx';

class Dashboard extends Component{
    constructor(){
        super();
        this.userInfo = Utils.getUserInfo();
        this.state = {
            userName: this.userInfo.username,
        }
    }

    render(){
        return(
            <div className="dashboard">
                <div className="header row">
                    <div className="centerDiv col-xs-10">
                        <h4>
                            Expense App
                        </h4>
                    </div>
                    <div className="userInfo col-xs-2 padding0">
                        <p>Hello, {this.state.userName}</p>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Dashboard