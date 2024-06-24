const { addIncome } = require('../controllers/income');
const { Router } = require('express')

const router=require('express').Router()

router.post('/add-income', addIncome)

module.exports=router