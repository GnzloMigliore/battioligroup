const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const session = require('express-session');



// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname,'public')))




// Aquí requerimos nuestros middlewares de session y cookies
app.use(session({
    secret : 'topSecret',
    resave: true,
    saveUninitialized: true,
}));
//Aqui coloco el Middleware para activar lo referido a las cookies
app.use(cookieParser());
// Requiero el middleware para recordar el usuario en la vista
app.use(user);






const webRouter = require('./routes/web');
const userRouter = require('./routes/users');
const adminUserRouter = require('./routes/adminUser');
const adminProductsRouter = require('./routes/adminProducts');
const adminProducts = require('./routes/products');

app.use(webRouter);
app.use(userRouter);
app.use(adminUserRouter);
app.use(adminProductsRouter);
app.use(adminProducts);


app.listen(3000,'localhost',() =>  console.log('servidor corriendo en el puerto 3000'));


module.exports = app;

