const express = require('express')
const userRouter = express.Router()
const { Page, User } = require('./../views/models/index')
const userList = require('./../views/userList')
const userPages = require('./../views/userPages')

// /users/

userRouter.get('/', async (req, res, next)=>{
    
    let users = await User.findAll()

    res.send(userList(users))
})

userRouter.get('/:id', async (req, res, next)=>{
	let user = await User.findById(req.params.id)
	
	let pages = await Page.findAll({
		where: {
		authorId : req.params.id
		}
	})
	
	try{
		res.send(userPages(user, pages))
	}
	catch(error){
		console.log(error)
	}
})

userRouter.get('/add', (req, res, next)=>{

    res.send(addPage())
})

userRouter.post('/', (req, res, next)=>{
    res.send()
})



module.exports = userRouter;

