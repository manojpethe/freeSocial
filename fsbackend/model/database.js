const Sequelize = require("sequelize");

// const db = new Sequelize("nextjsdb", "nextjs", "nextjs", {
//   dialect: "postgres",
//   host: "localhost",
// });

const db = new Sequelize('', '', '', {  
  dialect: 'sqlite',
  storage: '/home/manoj/code/freeSocial/freeSocial/fsbackend/database/database.sqlite'
});

module.exports = db;