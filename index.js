require('dotenv').config();
//const express = require('express');
const mongoose = require('mongoose');
const app = require('./src/server.js');

// ! Variables de Entorno
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB Connection Succesful');
    app.listen(8080, () => {
      console.log('Clean architecture API server is UP');
    });
  })
  .catch((err) => {
    console.log('DB Connection Error');
  });
