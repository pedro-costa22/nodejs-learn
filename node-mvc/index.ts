import * as express from 'express';
import * as exphbs from 'express-handlebars';
import sequelize from './db/connection';
import * as TaskRoutes from './routes/TaskRoutes';

const app = express();
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(express.static('public'));
app.use('/tasks', TaskRoutes.default);




(async() => {
    //Models
    const Task = require('./models/Task');

    await sequelize.sync();
    app.listen(3000);
})();