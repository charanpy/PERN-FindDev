const { Op } = require('sequelize');
const Developer = require('../models/Developers');

exports.addDev = async (req, res) => {
  try {
    const { username, email, technologies, country, level } = req.body;

    if (!email || !username || !level) {
      throw new Error('Email, username and level are required');
    }

    const dev = await Developer.create({
      username,
      email,
      technologies: technologies ? technologies.toLowerCase() : '',
      country,
      level,
    });

    return res.status(201).json({
      status: 'success',
      dev,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getDev = async (req, res) => {
  try {
    const developers = await Developer.findAll();

    return res.status(200).json({
      status: 'success',
      developers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
    });
  }
};

exports.search = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term)
      return res.status(200).json({
        status: 'success',
        developers: [],
      });
    const developers = await Developer.findAll({
      where: { technologies: { [Op.like]: `%${term}%` } },
    });

    return res.status(200).json({
      status: 'success',
      developers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
    });
  }
};

exports.deleteDev = async (req, res) => {
  try {
    if (!req.params.devId) throw new Error('Invalid Dev Id');
    await Developer.destroy({ where: { id: parseInt(req.params.devId) } });
    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
