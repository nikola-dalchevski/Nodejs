const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, value) => {
  const id = value * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'error',
      message: 'Not Found'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status('400').json({
      status: 'failure',
      message: 'bad request no name in body'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

exports.addTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        date: {
          tour: newTour
        }
      });
    }
  );
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(item => item.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
};

exports.updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>'
      }
    });
  }
};

exports.deleteTour = (res, req) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
