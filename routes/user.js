const express = require('express')
const userRouter = express.Router()

// /users/

userRouter.get('/', (req, res, next)=>{
    console.log('on the get page')
    res.send('on the wiki get page')
})

userRouter.post('/', (req, res, next)=>{
    res.send()
})

userRouter.get('/add', (req, res, next)=>{
    res.send(addPage())
})




module.exports = userRouter;

