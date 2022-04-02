const express = require('express')
const app = express()
const port = 5000

const { User } = require('./models/User')
const bodyparser = require('body-parser')

const config = require('./config/key')

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const mongoose = require('mongoose');
const { use } = require('express/lib/application')
mongoose.connect(config.mongoURI)
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('helloo world')
})

app.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err)
      return res.json({success: false, err})
    return res.status(200).json({success:true})
  })
})

app.listen(port, () => console.log(`example app listening on port ${port}`))