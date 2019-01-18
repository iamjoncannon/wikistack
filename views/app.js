const express = require('express')
const app = express()
console.log(app)
//const morgan = require('morgan')
const main = require('./main.js')
const { db, Page, User} = require('./models/index.js');


//console.log(main())
//app.use(morgan)
//app.use(express.static('views'))
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    console.log(req.body)
    res.send(main());
  })

db.authenticate().
  then(() => {
    console.log('connected to the database');
  })

async function init (){
  await User.sync()
  await Page.sync()
  app.listen(3000, () => {
    console.log(`app Listening in port 3000`)
  });
}




