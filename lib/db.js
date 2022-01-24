const Sequelize = require('sequelize');

const sequelize = new Sequelize('FindCoder', 'postgres', process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (error) {
    console.log(error, 'Failed');
  }
};

module.exports = {
  sequelize,
  connectDB,
};
