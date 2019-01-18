'use strict'

const express = require('express')
const wikiRouter = express.Router()


// console.log('exporting ', wikiRouter)

//let addpage = require('./../views/addPage.js')

wikiRouter.get('/', (req, res, next)=>{
    console.log('on the get page')
    res.send()
})

wikiRouter.post('/', (req, res, next)=>{
    res.send()
})

wikiRouter.get('/add', (req, res, next)=>{
    res.send()
})

module.exports = wikiRouter;
