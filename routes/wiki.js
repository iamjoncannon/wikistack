'use strict'

const express = require('express')
const wikiRouter = express.Router()

let addPage = require('./../views/addPage.js')


// /wiki/

wikiRouter.get('/', (req, res, next)=>{
    console.log('on the get page')
    res.redirect('/')
})

wikiRouter.post('/:num', (req, res, next)=>{
    res.send()
})

wikiRouter.get('/add', (req, res, next)=>{
    res.send(addPage())
})

module.exports = wikiRouter;
