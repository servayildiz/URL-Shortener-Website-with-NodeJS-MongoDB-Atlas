let express = require('express')
let pageModel = require('../../models/ShortURL')
let multer = require('multer');
let router = express()


//IMAGE NAME SETTING
let storage = multer.diskStorage({
    destination: 'public/backend/images/',
    filename: (req, file, cb) => {
        //cb(null, Date.now() + file.originalname) // file name setting with current –date
	cb(null ,  file.originalname) // file name setting with original name
    }
})

//IMAGE UPLOAD SETTING
let upload = multer({
    storage: storage,
    // here image validation
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only Jpg, png, jpeg, allow'))
        }
    }})  


router.get('/', (req, res)=>{
    pageModel.find({})
    .then((x)=>{
        res.render('../views/backend/pages', {x})
    }).catch((y)=>{
        console.log(y)
    })
})
router.get('/add-pages/', (req, res)=>{
    res.render('../views/backend/pagesAdd')
})

router.post('/add-pages/', upload.single('page_Photo'), (req, res)=>{   
   if(!req.body.mainUrl){
    pageModel.findOne({mainUrl:req.body.mainUrl})
    .then((a)=>{
        if(a){
                req.flash('err', 'Your have already use this url, please input another url')
                res.redirect('/admin/pages/') 
        }
        else if(!req.file){
                //create page without photo
                let data ={
                    mainUrl : req.body.mainUrl,
                    currentUrl : req.body.currentUrl,
                    customUrl : req.body.customUrl,
                    createdDate : req.body.createdDate,
                   
                }
                console.log(data)
                pageModel.create(data)
                .then((x)=>{
                    req.flash('sucess', 'Your Data has been created on Data base')
                    res.redirect('/admin/pages/')

                }).catch((y)=>{
                    console.log(y)
                })
                //end create page
            
        }
        else{
            //create page with photo
            let data ={
                mainUrl : req.body.mainUrl,
                currentUrl : req.body.currentUrl,
                customUrl : req.body.customUrl,
                createdDate : req.body.createdDate,
               
            }
            console.log(data)
            pageModel.create(data)
            .then((x)=>{
                req.flash('sucess', 'Your Data has been created on Data base')
                res.redirect('/admin/pages/')

            }).catch((y)=>{
                console.log(y)
            })
            //end create page
        }
    })
   }
   else{
    req.flash('err', 'You have not any input url')
    res.redirect('/admin/pages/')
   }
    
})



//THIS ROUTE USE FOR READ OLD DATA &  SET EDIT FORM
router.get('/edit-pages/:id', (req, res)=>{
    pageModel.findOne({mainUrl:req.params.id})
    .then((x)=>{
        res.render('../views/backend/pagesEdit', {x})
        console.log(x)
    })
    .catch((y)=>{
        console.log(y)
    })
})

//THIS IS PAGE EDIT ROUTER AFTER SUBMIT FORM



router.put('/edit-pages/:id', upload.single('page_Photo'), (req, res)=>{
    if(!req.file){
        console.log(req.params.id)
        // without image update
        pageModel.updateOne({mainUrl:req.params.id}, {$set:{
            mainUrl : req.body.mainUrl,
            currentUrl : req.body.currentUrl,
            customUrl : req.body.customUrl,
            createdDate : req.body.createdDate,
           
        }})
        .then((x)=>{
            console.log(x)
            req.flash('sucess', 'Your Data has sucessfully updated.')
            res.redirect('/admin/pages/')
        }).catch((y)=>{
            console.log(y)
        })
        //end
    }
    else{
        // with image update
        pageModel.updateOne({mainUrl:req.params.id}, {$set:{
            mainUrl : req.body.mainUrl,
            currentUrl : req.body.currentUrl,
            customUrl : req.body.customUrl,
            createdDate : req.body.createdDate,
           
        }})
        .then((x)=>{
            console.log(x)
            req.flash('sucess', 'Your Data has sucessfully updated.')
            res.redirect('/admin/pages/')
            
        }).catch((y)=>{
            console.log(y)
        })
        //end
    }
    
})



//THIS IS PAGE DELETE ROUTER 
router.delete('/delete-pages/:id', (req, res)=>{
    pageModel.deleteOne({mainUrl:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has sucessfully deltted from data base.')
        res.redirect('/admin/pages/')
    }).catch((y)=>{
        console.log(y)
    })
})





module.exports = router