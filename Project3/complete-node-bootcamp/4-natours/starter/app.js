const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
