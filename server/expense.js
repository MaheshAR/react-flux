const dataAccess = require('./dataAccess').dataAccess;
const expenseCollection = 'expense';

function expense(){
    function getExpense(req){
        return new Promise((resolve, reject) => {
            const obj = {};
            dataAccess.getItem({collection: expenseCollection, obj: obj})
                .then(data => {
                    return resolve({err: null, success: true, message: "", result: data})
                })
                .catch(err => {
                    return reject(err);
                })
        });
    }

    function getExpenseById(userId){
        return new Promise((resolve, reject) => {
            const obj = {
                userId: userId
            }
            dataAccess.getItem({collection: expenseCollection, obj: obj})
                .then(data => {
                    return resolve({err: null, success: true, message: "", result: data})
                })
                .catch(err => {
                    return reject(err);
                })
        });
    }

    function addExpense(req){
        return new Promise((resolve, reject) => {
            const userId = req.body.userId;
            const expenseId = req.body.expenseId;
            const paramsToFind = {
                userId: userId,
                expenseId: expenseId
            };

            dataAccess.findItem({collection: expenseCollection, obj: paramsToFind})
                .then((expense) => {
                    if(expense){
                        return Promise.reject(`Expense for ${expense.name} already exists`);
                    }
                    return Promise.resolve();
                })
                .then(() => {
                    const itemsToInsert = {
                        userId: userId,
                        expenseId: expenseId,
                        name: req.body.name,
                        amount: req.body.amount,
                        createdOn: new Date().toISOString(),
                        expense: {}
                    };

                    dataAccess.insertItem({collection: expenseCollection, obj: itemsToInsert})
                        .then((expense) => {
                            return resolve({err: null, success: true, message: `Expense for ${expense.ops[0].name} added`, result: expense.ops[0]});
                        });
                })
                .catch((err) => {
                    return reject(err);
                })
        });
    }

    function addDailyExpense(req){
        return new Promise((resolve, reject) => {
            const {userId, expenseId} = req.params;
            const dailyExpenseId = req.body.dailyExpenseId;
            const paramsToFind = {
                userId: userId,
                expenseId: expenseId
            };
    
            dataAccess.findItem({collection: expenseCollection, obj: paramsToFind})
                .then((expense) => {
                    let dailyExpense = expense.expense;
                    if(Object.keys(dailyExpense).length && dailyExpense.hasOwnProperty(dailyExpenseId)){
                        const name = dailyExpense[dailyExpenseId].name;
    
                        return Promise.reject(`Expense for the day ${name} has already been added`);
                    }
    
                    return Promise.resolve(expense);
                })
                .then((expense) => {
                    const query = {
                        userId: userId,
                        expenseId: expenseId
                    };
                    let itemToUpdate = expense;
    
                    itemToUpdate.expense[dailyExpenseId] = {
                        name: req.body.name,
                        amount: req.body.amount,
                        reason: req.body.reason,
                        createdOn: new Date().toISOString()
                    };
    
                    dataAccess.updateItem({collection: expenseCollection, query: query, obj: itemToUpdate})
                        .then(expense => {
                            resolve({err: null, success: true, message: `Expense for the day ${req.body.name} added`, result: []});
                        });
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    return{
        getExpense: getExpense,
        getExpenseById: getExpenseById,
        addExpense: addExpense,
        addDailyExpense: addDailyExpense
    }
}

module.exports.expense = expense();