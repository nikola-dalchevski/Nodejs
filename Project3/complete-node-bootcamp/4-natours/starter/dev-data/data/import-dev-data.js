const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('success connection to db'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`),
  'utf-8'
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded!');
  } catch (error) {
    console.log('no added');
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted');
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
