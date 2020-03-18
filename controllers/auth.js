const User = require('../models/user');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const host = 'localhost:2000';
//const host = 'https://yourpartner.run-ap-south1.goorm.io/'

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: ""
    }
}));

exports.getLogin = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    if(!isLoggedIn) {
        res.render('auth/login', {
            pageTitle: "Login",
            path: 'login',
            message: false,
            isLoggedIn: isLoggedIn
        });
    }else{
        res.redirect('/');
    }
};

exports.postLogin = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.login(email,password)
        .then((result)=>{
            if(result[0] === 'logIn' || result[0] === 'logInButCompleteTheProfileFirst') {
                if(result[1]==='N'){
                    const fullToken = 'http://'+host+'/auth/verify/'+email;
                    transporter.sendMail({
                        to: email,
                        from: 'prem@yourpartner.com',
                        subject: 'Verify Email Address',
                        html: `<h1>Your Partner</h1>
                                <br>
                                <h2>You are newly signed up on yourpartner.com. </h2><br><h3>You won't be able to use our services untill you verify your email address.</h3>
                                <br>
                                <h4>Click the button to verify your email address</h4>
                                <div class="p-t-15">
                                    <a href="${fullToken}"><button style="position: center ;float: left;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;background: #4272d7;">Verify Email</button></a>
                                </div>`
                    })
                        .catch(err => console.log(err));

                    res.render('auth/not-verified',{
                        pageTitle:"Please verify your email address",
                        path:"",
                        isLoggedIn:false
                    });
                    req.session.isLoggedIn = undefined;
                    return;
                }
                console.log('cookie setting');
                req.session.isLoggedIn = true;
                req.session.email = email;
                req.session.password = password;

                if(result[0] === 'logInButCompleteTheProfileFirst') {
                    res.redirect('/first-step');
                }
                else {
                    res.redirect('/');
                }
            }else {
                res.render('auth/login',{
                    pageTitle: "Login",
                    path: 'login',
                    message: 'Wrong Email or Password, Try Forgot Password...',
                    isLoggedIn: false
                });
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
        res.render('auth/signUp',{
            pageTitle: "Create Profile",
            path: 'signup',
            message : undefined,
            userData: [],
            isLoggedIn: req.session.isLoggedIn
        });
    }
};

exports.postSignUp = (req,res)=>{
    let obj = req.body;
    for(let o in obj){
        obj[o]=obj[o].trim();
    }
    User.signup(obj)
        .then( ()=> {
            const email = obj.EmailID;
            res.redirect('/auth/login');
            const fullToken = 'http://'+host+'/auth/verify/'+email;
            transporter.sendMail({
                to: email,
                from: 'prem@yourpartner.com',
                subject: 'Verify Email Address!',
                html: `<h1>Your Partner</h1>
                                <br>
                                <h2>You are newly signed up on yourpartner.com. </h2><br><h3>You won't be able to use our services untill you verify your email address.</h3>
                                <br>
                                <h4>Click the button to verify your email address</h4>
                                <div class="p-t-15">
                                    <a href="${fullToken}"><button style="position: center ;float: left;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;background: #4272d7;">Verify Email</button></a>
                                </div>`
            })
                .catch(err => console.log(err));
        })
        .catch(err => {
            if(err.errno === 1062){
                if(req.session.isLoggedIn){
                    res.redirect('/');
                }else{
                    res.render('auth/signUp',{
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
};

exports.postForgotPassword = (req,res) =>{
    const EmailID = req.body.EmailID;
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write('<h1>Attention!</h1><br /><br />There might be some seriout technical issue due to which you are not able to sign up <br />Please Try again Later');
            res.end();
        }
        const token = buffer.toString('hex');

        User.setToken(EmailID,token)
            .then(result=>{
                if(result[0].affectedRows === 0){
                    res.render('auth/resetPassword',{
                        pageTitle: "Forgot Password",
                        path: "",
                        message: "No account linked to given email, try again",
                        isLoggedIn: false
                    });
                }else if(result[0].affectedRows === 1){
                    const fullToken = `http://${host}/reset/get/${token}`;
                    transporter.sendMail({
                        to: EmailID,
                        from: 'prem@yourpartner.com',
                        subject: 'Reset Password!',
                        html: `<h1>Your Partner</h1>
                                <br>
                                <h2>You requested for password reset</h2>
                                <br>
                                <h2>Click the button to reset password</h2>
                                <h3>link is valid for 10 minutes</h3>
                                <div class="p-t-15">
                                    <a href="${fullToken}"><button style="position: relative;float: left;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;background: #4272d7;">Reset Password</button></a>
                                </div>`
                    })
                        .catch(err => console.log(err));
                    res.render('auth/login',{
                        pageTitle: "Login",
                        path: 'login',
                        message: 'Check your Email to reset password',
                        isLoggedIn: false
                    });
                }
                else{
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.write('<h1>Attention!</h1><br /><br />There might be some seriout technical issue due to which you are not able to sign up <br />Please Try again Later');
                    res.end();
                }
            })
            .catch(err => console.log(err));

    })



};

exports.getForgotPassword = (req,res) =>{
    res.render('auth/resetPassword',{
        pageTitle: "Forgot Password",
        path: "",
        message: undefined,
        isLoggedIn: false
    });
};


exports.getVerifyEmail =(req,res)=>{
    User.verifyEmail(req.params.email)
        .then(()=>{
            res.redirect('/auth/login');
        })
        .catch(err=>console.log(err));
};
