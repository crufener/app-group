import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';
import * as passport from 'passport';


import routes from './routes/index';
import users from './routes/users';
import User from './models/userModel';
import login from './routes/userRoutes';

const dbUrl = 'mongodb://crufener:jenniferr1@ds023624.mlab.com:23624/taskapp';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login)


// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});

mongoose.connect(dbUrl).then(() => {
    mongoose.connection.db.dropDatabase(() => {
        let Fred = new User();
        let Jen = new User();
        let Craig = new User();
        let Marry = new User();
        Fred.username = 'fred';
        Fred.password = 'fred';
        Jen.username = 'jen';
        Jen.password = 'jen';
        Craig.username = 'craig';
        Craig.password = 'craig';
        Craig.admin = true;
        Marry.username = 'marry';
        Marry.password = 'password';

        Fred.save();
        Jen.save();
        Craig.save();
        Marry.save();
    });
}).catch((err) => {
    console.error(err, err.message);
});

export = app;
