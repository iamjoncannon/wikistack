'use strict'

const express = require('express')
const app = express()
//console.log(app)
//const morgan = require('morgan')
const main = require('./main.js')
const { db, Page, User} = require('./models/index.js');

const wikiRouter = require('./../routes/wiki');

// console.log(wikiRouter)

//const userRouter = require('./../routes/user');


//console.log(main())
//app.use(morgan)
//app.use(express.static('views'))
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter)

app.get("/", (req, res) => {
    // console.log(req.body)
    res.send(main());
  })

db.authenticate().
  then(() => {
    console.log('connected to the database');
  })

async function init (){
//   db.sync({force: true})
  await User.sync()
  await Page.sync()
  app.listen(3000, () => {
    console.log(`app Listening in port 3000`)
  });
}

init()
