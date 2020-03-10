/////////////////////////////////////////////////////////////////////////
/* Deployment Dependencies*/
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
//////////////////////////////////////////////////////////////////////////
/*instances used*/
const app = express();
const path = require('path');
//////////////////////////////////////////////////////////////////////////
/*Routes includes*/
const userRoutes  = require('./routes/user');
const authRoutes  = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error')
//////////////////////////////////////////////////////////////////////////
/* EJS used to render templates into webpages*//*middlewares*/
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'r#$#EF#rg45tr34%4454Rf$F%T%^tY567iU&*OI()P)(K0-+{_)_:0_;0_0OHerRWmyse32@#$%452$%2%4ewFEfEr3e3434#FdERf3R#4%Tfq3WEcxcSdCE34r$53^c666787r89*(*8980e08909%TH%y5Ty%W$rt$%Ty%%y96U^&U6u6u07&I7&I&8(*(*89(:)P090',resave:false, saveUninitialized:false,cookie:{ maxAge :31536000000 }}));
//////////////////////////////////////////////////////////////////////////
/*routes priorities*/
app.use('/auth',authRoutes.routes);
app.use('/admin',adminRoutes.routes);
app.use(userRoutes.routes);
app.use(errorController.get404);
//////////////////////////////////////////////////////////////////////////
/* localhost:2000 used as domain of the project
To start the project type "npm start" in console*/
app.listen(2000);
