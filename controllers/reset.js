const User = require('../models/user');

exports.getReset = (req,res)=>{
    const token = req.params.token;
    User.checkToken(token)
        .then(([results,tableDEF])=>{
            console.log(results[0])
            if(results[0].rowsFound) {
                res.render('auth/getReset',{
                    pageTitle: "Set new password",
                    path: '',
                    token: token,
                    isLoggedIn: false
                })
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write('<h1>Sorry!</h1><br /><br />The Link is expired or may be broken <br />Please send a request to reset your password');
                res.end();
            }
        })
        .catch(err => console.log(err))
}


exports.postReset = (req,res)=>{
    const token = req.params.token;
    User.changePWD(token,req.body.password)
        .then(([results,TD]) => {
            console.log(results)
            if(results.affectedRows===1){
                res.render('auth/login', {
                    pageTitle: "Login",
                    path: 'login',
                    message: "Log in with new password",
                    isLoggedIn: false
                });
            }else {
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write('<h1>Sorry!</h1><br /><br />The Link is expired or may be broken <br />Please send a request to reset your password');
                res.end();
            }
        })
        .catch(err => console.log(err));
}
