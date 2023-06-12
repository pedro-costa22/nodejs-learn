import { DataTypes } from "sequelize";
import sequelize from "../../db/dbConnection";

import User from "./User";

const Address = sequelize.define('Address', {
    street: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    }
});

User.hasMany(Address);
Address.belongsTo(User);    

export default Address;