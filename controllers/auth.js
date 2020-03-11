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
