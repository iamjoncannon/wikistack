'use strict'

const express = require('express')
const wikiRouter = express.Router()

const { Page, User } = require('./../views/models/index.js');

let addPage = require('./../views/addPage.js');
let wikiPage = require('./../views/wikipage.js')

// /wiki/

wikiRouter.get('/', (req, res, next)=>{

    res.send('not yet')
})

wikiRouter.get('/add', (req, res, next)=>{
    res.send(addPage())
})

wikiRouter.get('/:slug', async (req, res, next)=>{

	try {
		const page = await Page.findOne({
			where: {
				slug: req.params.slug
			}
		})
		res.send(wikiPage(page));
	}
	catch(error){
		next(error)
	}
})

wikiRouter.post('/', async (req, res, next)=>{

	let slug;

	if (!req.body.title){
		slug = Math.random() * 1000
	}
	else if (req.body.title){
		slug = req.body.title.replace(/\s/g, '');
	}

	const [instance, wasCreated ] = await User.findOrCreate({
		where: { name: req.body.authorName,
				 email: req.body.AuthorEmail
				}
	})

	const page = new Page({
		title: req.body.title,
		slug: slug,
		content: req.body.pageContent,
		status: 'open',
	})

	try {
		page.setAuthor(instance)

		await page.save();

		console.log(page)

		res.redirect('/wiki/' + slug)

	}
	catch (error){
		next(error)
	}

})

module.exports = wikiRouter;
