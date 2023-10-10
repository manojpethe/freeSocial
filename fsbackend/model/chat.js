const Sequelize = require("sequelize");
const db = require("./database");

const Chat = db.define("Chat", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    fromid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    toid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Chat;