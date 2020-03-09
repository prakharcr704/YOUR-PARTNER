exports.getHomepage = (req,res,next)=>{
    res.render('index',{
        pageTitle: "HomePage",
        path: "homepage"
    });
};
exports.getAboutpage = (req,res,next)=>{
    res.render('about',{
        pageTitle: "About",
        path: "about"
    });
};
exports.getServicespage = (req,res,next)=>{
    res.render('services',{
        pageTitle: "ServicesPage",
        path: "services"
    });
};
exports.getGalleryPage = (req,res,next)=>{
    res.render('gallery',{
        pageTitle: "GalleryPage",
        path: "gallery"
    });
};
exports.getContactpage = (req,res,next)=>{
    res.render('contact',{
        pageTitle: "ContactPage",
        path: "contact"
    });
};
