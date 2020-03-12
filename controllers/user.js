const User = require('./../models/user');
const db = require('./../util/database');
exports.getHomepage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/first-step');
            else
                res.render('index',{
                    pageTitle:"Your Partner — Explore new era of Wedding planner",
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
                        .catch(err => console.log(err))
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

exports.postEdit = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    if(!isLoggedIn){
        res.redirect('/auth/login');
        return;
    }
    const email = req.session.email;
    User.GetNewUserData(email)
        .then(result=>{
            updatedData = req.body;
            for(key in updatedData){
                updatedData[key] = updatedData[key].trim();
            }
            for(key in updatedData){
                if(updatedData[key]==='')
                    updatedData[key]=null;
            }
            if(updatedData.Income)
                updatedData.Income = Number(updatedData.Income);
            if(updatedData.ChildrenStatus)
                updatedData.ChildrenStatus = Number(updatedData.ChildrenStatus);
            if(updatedData.Sisters)
                updatedData.Sisters = Number(updatedData.Sisters);
            if(updatedData.Brothers)
                updatedData.Brothers = Number(updatedData.Brothers);
            if((updatedData.Income  && (typeof updatedData.ChildrenStatus === "number") && updatedData.Sisters && updatedData.Brothers)){
                User.update(email,updatedData,'edit-profile')
                    .then(result=>{
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.redirect('/');
                    });
            }else {
                res.redirect('/first-step');
            }
        })
        .catch(err => console.log(err));

}



exports.getFirstStep = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    if(!isLoggedIn){
        res.redirect('/auth/login');
        return;
    }
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst'){
                const email = req.session.email;
                User.GetNewUserData(email)
                    .then(result=>{
                        res.render('first-step',{
                            pageTitle: "Complete The Proile Data",
                            path: 'complete-profile',
                            userData: null,
                            newUserData: result[0],
                            isLoggedIn: req.session.isLoggedIn
                        });
                    })
                    .catch(err => console.log(err));
            }
            else
                res.redirect('/');
        })
        .catch(err=>{console.log(err)});
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
            for(key in updatedData){
                updatedData[key] = updatedData[key].trim();
            }
            for(key in updatedData){
                if(updatedData[key] ==='')
                    updatedData[key]=null;
            }
            if(updatedData.Income)
                updatedData.Income = Number(updatedData.Income.trim());
            if(updatedData.ChildrenStatus)
                updatedData.ChildrenStatus = Number(updatedData.ChildrenStatus.trim());
            if(updatedData.Sisters)
                updatedData.Sisters = Number(updatedData.Sisters.trim());
            if(updatedData.Brothers)
                updatedData.Brothers = Number(updatedData.Brothers.trim());
            if((updatedData.Income  && (typeof updatedData.ChildrenStatus === "number") && updatedData.Sisters && updatedData.Brothers)){
                User.update(email,updatedData,'first-step')
                    .then(result=>{
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.redirect('/');
                    });
            }else {
                res.redirect('/first-step');
            }
        })
        .catch(err => console.log(err));
};




















