const Sequelize = require("sequelize");
const db = require("./database");

const Users = db.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        // primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    registered: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    profile: {
        type: Sequelize.JSON,
        allowNull: true,
    },
});

module.exports = Users;