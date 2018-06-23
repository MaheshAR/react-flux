const express = require('express');
const router = express.Router();
const db = require('../db').mongoConnection;
const authentication = require('../authentication').authentication;
const expense = require('../expense').expense;

router.post('/register', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(authentication.register(req));
    })
        .then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err
			});
	    });
});

router.post('/login', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(authentication.login(req));
    })
        .then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message,
				result: data.result
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err,
				success: false
			});
	    });
});

router.get('/getExpense', (req, res) => {
	new Promise((resolve, reject) => {
		resolve(expense.getExpense(req));
	})
		.then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message,
				result: data.result
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err,
				success: false
			});
		});
});

router.get('/getExpenseById/:userId', (req, res) => {
	new Promise((resolve, reject) => {
		resolve(expense.getExpenseById(req.params.userId));
	})
		.then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message,
				result: data.result
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err,
				success: false
			});
		});
});

router.post('/addExpense', (req, res) => {
	new Promise((resolve, reject) => {
		resolve(expense.addExpense(req));
	})
		.then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message,
				result: data.result
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err,
				success: false
			});
		});
});

router.post('/dailyExpense/:userId/:expenseId', (req, res) => {
	new Promise((resolve, reject) => {
		resolve(expense.addDailyExpense(req));
	})
		.then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message,
				result: data.result
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err,
				success: false
			});
		});
});

module.exports = router;