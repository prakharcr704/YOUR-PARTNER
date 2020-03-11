const User = require('./../models/user');
const db = require('./../util/database');
exports.getHomepage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/edit-profile');
            else
                res.render('index',{
                    pageTitle: "HomePage",
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
                res.redirect('/edit-profile');
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
                res.redirect('/edit-profile');
            else
                res.render('services',{
                    pageTitle: "ServicesPage",
                    path: "services",
                    isLoggedIn: req.session.isLoggedIn
                });
        })
        .catch(err=>{console.log(err)});
};
exports.getGalleryPage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/edit-profile');
            else
                res.render('gallery',{
                    pageTitle: "GalleryPage",
                    path: "gallery",
                    isLoggedIn: req.session.isLoggedIn
                });
        })
        .catch(err=>{console.log(err)});
};

exports.getContactpage = (req,res,next)=>{
    User.login(req.session.email,req.session.password)
        .then(result => {
            if(result == 'logInButCompleteTheProfileFirst')
                res.redirect('/edit-profile');
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
                    res.render('edit-profile',{
                        pageTitle: "Fill Proile Data",
                        path: 'complete-profile',
                        userData: null,
                        isLoggedIn: req.session.isLoggedIn
                    });
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
