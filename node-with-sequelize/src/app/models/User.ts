import { DataTypes } from "sequelize";
import sequelize from "../../db/dbConnection";


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }
});

export default User;
