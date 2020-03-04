const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
