if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routers');
const formidableMiddleware = require('express-formidable');
// const errHandler = require ('./middlewares/errHandler')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formidableMiddleware({uploadDir: './uploads'}));
app.use(router);
// app.use(errHandler)

module.exports = app;
