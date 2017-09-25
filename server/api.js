'use strict'
const api = require('express').Router()
const db = require('../db');
const models = require('../db/models');
const cheerio = require("cheerio")
const tinyreq = require('tinyreq');
const Site = models.Site;
const Recipe = models.Recipe

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

api.post('/url', function(req, res, next){
	Site.create({
		link: req.body.url,
	})
	.then(info => {
		res.status(201).json(info)})
	.catch(next);
})

api.post('/recipe', function(req, res, next){

	tinyreq(req.body.url, function(err, body){
		const $ = cheerio.load(body)
	//	console.log(body)
		let direction = ""
		$("li.recipe__direction").each(function(){
			let str = $( this ).text()||err
			direction = direction.concat(str, "|")
		  }
		)
		const title = $("h1.recipe__mainHeading").text()||err
		// const image = $("img.recipe__image").attr("src").text()||err
		// console.log("image:", image)
		 Recipe.create({
		 directions: direction,
		 Name: title
  		})
		})
	.then(info => {
		res.status(201).json(info)})
	.catch(next);
})

api.get('/recipe', function(req, res, next){
	Recipe.findAll({})
	.then(recipe => {
		res.json(recipe)})
	.catch(next)
})



module.exports = api
