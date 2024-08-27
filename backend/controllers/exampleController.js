// backend/controllers/exampleController.js
const Example = require('../models/exampleModel');

// Example controller functions
exports.getExamples = async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createExample = async (req, res) => {
  try {
    const newExample = new Example({
      name: req.body.name,
    });

    const example = await newExample.save();
    res.json(example);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
