'use strict'

console.clear()

const express = require('express')
const app = express()
const main = require('./main.js')
const { db, Page, User} = require('./models/index.js');
const wikiPage = require('./wikiPage');
const wikiRouter = require('./../routes/wiki');
const userRouter = require('./../routes/user');

//console.log(main())
//app.use(morgan)
app.use(express.static('views'))
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter)

app.use('user', userRouter)

app.get("/", async (req, res, next) => {
    
    let pages = await Page.findAll();

    pages = pages.map((x)=> x = x.dataValues)

    console.log('pages: ', pages)

    let output = ''

    pages.forEach((x)=> output += wikiPage(x))

    console.log(output)

    res.send(main(output))
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
