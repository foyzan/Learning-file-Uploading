require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const fileRouter = require('./routes/routes')
app.use(cors({}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(fileRouter)





app.use((err, req, res, next)=>{
    // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
})

module.exports = app