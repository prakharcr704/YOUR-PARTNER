const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    const isLoggedIn = req.session.isLoggedIn;
    if(!isLoggedIn) {
        res.render('auth/login', {
            pageTitle: "Login",
            path: 'login',
            isLoggedIn: isLoggedIn
        });
    }else{
        res.redirect('/');
    }
};

exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.login(email,password)
        .then(result=>{
            result = result.toString();
            console.log(result);
            if(result === 'logIn' || result === 'logInButCompleteTheProfileFirst') {
                console.log('cookie setting');
                req.session.isLoggedIn = true;
                req.session.email = email;
                req.session.password = password;
                if(result === 'logInButCompleteTheProfileFirst') {
                    res.redirect('/first-step');
                    return;
                }
                else {
                    res.redirect('/');
                    return;
                }
            }else {
                res.redirect('/auth/login')
            }
        })
        .catch(err => console.log(err));
};

exports.getLogout = (req,res)=>{
    req.session.isLoggedIn = undefined;
    req.session.email = undefined;
    req.session.password = undefined;
    res.redirect('/auth/login');
};


exports.getSignUp = (req,res) => {
    if(req.session.isLoggedIn){
        res.redirect('/');
    }else{
        res.render('signUp',{
            pageTitle: "Fill Proile Data",
            path: 'signup',
            message : undefined,
            userData: [],
            isLoggedIn: req.session.isLoggedIn
        });
    }
};

exports.postSignUp = (req,res)=>{
    let obj = req.body;
    for(o in obj){
        obj[o]=obj[o].trim();
    }
    User.signup(obj)
        .then(result => {
            res.redirect('/auth/login');
            return;
        })
        .catch(err => {
            if(err.errno === 1062){
                if(req.session.isLoggedIn){
                    res.redirect('/');
                }else{
                    res.render('signUp',{
                        pageTitle: "Fill Proile Data",
                        path: 'signup',
                        userData: [],
                        message: ["Email / Mobile Number already exist","Try using another credentials"],
                        isLoggedIn: req.session.isLoggedIn
                    });
                }
            }else {
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write('<h1>Attention!</h1><br /><br />There might be some seriout technical issue due to which you are not able to sign up <br />Please Try again Later');
                res.end();
            }
        });
}
