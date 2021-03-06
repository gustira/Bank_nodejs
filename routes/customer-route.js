const express = require('express');
const customerDao = require('../dao/customer-dao');
const resp = require('../models/response');

const CustomerRoute = express.Router();

CustomerRoute.get('/customers', (req, res)=>{
    let filter = {};
    
    if(req.query.address){
        filter.address = req.query.address;
    }
    customerDao.getList(function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }
    }, filter);
})

CustomerRoute.get('/customer/:cif', (req, res)=>{
    customerDao.getById(req.params['cif'], function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
})

CustomerRoute.post('/customer', (req, res, next) => {
    customerDao.insert(req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }
    });
});

CustomerRoute.post('/customer/login', (req, res)=>{
    let filter = {}

    filter.username = req.body.username
    filter.password = req.body.password

    customerDao.login(function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            // console.log('hasil result')
            // console.log(result)
            resp.ok(res, result);
        }
    }, filter);
})

CustomerRoute.put('/customer/:cif', (req, res, next) => {
    customerDao.update(req.params.cif, req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
});

CustomerRoute.delete('/customer/:cif', (req, res, next) => {
    customerDao.remove(req.params.cif, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
});
  
module.exports = CustomerRoute;
