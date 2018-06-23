import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from './components/main.component.jsx'
import Login from './components/login/login.component.jsx';
import Register from './components/register/register.component.jsx';
import Dashboard from './components/dashboard/dashboard.component.jsx';
import Expense from './components/dashboard/expense.component.jsx';
import ExpenseList from './components/dashboard/expenseList.component.jsx';

render(
    <Router history={browserHistory}>
        <Route component={Main}>
            <Route path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route component={Dashboard}>
                <Route path="/dashboard" component={Expense}/>
                <Route path="/dashboard/:id" component={ExpenseList}/>
            </Route>
            
        </Route>
    </Router>,
    document.getElementById('container')
);
