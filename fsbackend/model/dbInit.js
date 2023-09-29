const db = require("./database");

const Users = require("./users");

// Customer.hasMany(Order);

let contactId = null;
db
  .sync({force: true})
  // .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });