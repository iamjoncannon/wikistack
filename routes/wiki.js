'use strict'

const express = require('express')
const wikiRouter = express.Router()

const { Page } = require('./../views/models/index.js');

let addPage = require('./../views/addPage.js');
let wikiPage = require('./../views/wikipage.js')

// /wiki/

wikiRouter.get('/', (req, res, next)=>{

    res.send('not yet')
})

wikiRouter.get('/:slug', async (req, res, next)=>{

	try {
		const page = await Page.findOne({
			where: {
				slug: req.params.slug
			}
		})
		res.redirect(wikiPage(page));
	}
	catch(error){
		next(error)
	}
})

wikiRouter.post('/', async (req, res, next)=>{

	console.log(req.body)

	let slug;

	if (!req.body.title){
		slug = Math.random() * 1000
	}
	else if (req.body.title){
		slug = req.body.title.replace(/\s/g, '');
	}

	const page = new Page({
		title: req.body.title,
		slug: slug,
		content: req.body.pageContent,
		status: 'open'
	})
	try {
		await page.save()
	}
	catch (error){
		next(error)
	}

	res.redirect('/wiki/' + slug)
})

wikiRouter.get('/add', (req, res, next)=>{
    res.send(addPage())
})

module.exports = wikiRouter;
