import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div className="container">
                {this.props.children}
            </div>
        );
    }
}

export default Main