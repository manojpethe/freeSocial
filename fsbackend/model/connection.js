const Sequelize = require("sequelize");
const db = require("./database");

const Connection = db.define("Connection", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    friendid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Connection;