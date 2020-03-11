const User = require('./../models/user');
const db = require('./../util/database');

exports.getHomepage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/first-step');
            else
                res.render('index',{
                    pageTitle: "Wedding — Explore new era of Wedding planner",
                    path: "homepage",
                    isLoggedIn: req.session.isLoggedIn
                });

        })
        .catch(err=>{console.log(err)});
};

exports.getAboutpage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/first-step');
            else
                res.render('about',{
                    pageTitle: "About",
                    path: "about",
                    isLoggedIn: req.session.isLoggedIn
                });

        })
        .catch(err=>{console.log(err)});
};

exports.getServicespage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/first-step');
            else
                res.render('services',{
                    pageTitle: "ServicesPage",
                    path: "services",
                    isLoggedIn: req.session.isLoggedIn
                });
        })
        .catch(err=>{console.log(err)});
};

exports.getContactpage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/first-step');
            else
                res.render('contact',{
                    pageTitle: "ContactPage",
                    path: "contact",
                    isLoggedIn: req.session.isLoggedIn
                });
        })
        .catch(err=>{console.log(err)});
};

exports.getDelete =(req,res)=>{
    User.delete(req.session.email)
        .then(() => {
            req.session.isLoggedIn = undefined;
            req.session.email = undefined;
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.getEdit = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    const email = req.session.email;

    if(isLoggedIn){
        User.edit(email)
            .then(result=>{
                if(result.length===0){
                    User.newUserData()
                        .then(result =>{
                            res.render('first-step',{
                                pageTitle: "Complete The Proile Data",
                                path: 'complete-profile',
                                userData: null,
                                newUserData: result[0],
                                isLoggedIn: req.session.isLoggedIn
                            });

                        })
                        .catch(err => console.log(err));
                }else{
                    const availableDataOfUser = result[0];
                    res.render('edit-profile',{
                        pageTitle: "Fill Proile Data",
                        path: 'edit-profile',
                        userData: availableDataOfUser,
                        isLoggedIn: req.session.isLoggedIn
                    });
                }
            })
            .catch(err => console.log(err));
    }else {
        res.redirect('/auth/login');
    }
};

exports.getFirstStep = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    if(!isLoggedIn){
        res.redirect('/auth/login');
        return;
    }
    const email = req.session.email;
    User.GetNewUserData(email)
        .then(result=>{
            console.log(result);
            res.render('first-step',{
                pageTitle: "Complete The Proile Data",
                path: 'complete-profile',
                userData: null,
                newUserData: result[0],
                isLoggedIn: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.postFirstStep = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    if(!isLoggedIn){
        res.redirect('/auth/login');
        return;
    }
    const email = req.session.email;
    User.GetNewUserData(email)
        .then(result=>{
            updatedData = req.body;
            updatedData.Income = Number(updatedData.Income);
            updatedData.Age = Math.floor(Date.now() / (1000*60*60*24*365) -  (result[0].AgeYear - 1970));
            updatedData.ChildrenStatus = Number(updatedData.ChildrenStatus);
            updatedData.Sisters = Number(updatedData.Sisters);
            updatedData.Brothers = Number(updatedData.Brothers);
            console.log(updatedData)
            if(!(updatedData.Income && updatedData.Age && updatedData.ChildrenStatus && updatedData.Sisters && updatedData.Brothers)){
                User.update(email,updatedData,'first-step')
                res.redirect('/');
            }else {
                res.redirect('/first-step');
            }
        })
        .catch(err => console.log(err));
};
