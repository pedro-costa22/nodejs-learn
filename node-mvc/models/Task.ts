import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Task = sequelize.define("task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});


export default Task;

