let express = require('express')
let pageModel = require('../../models/ShortURL')
let router = express()



//set local variable for header
// pageModel.find({})
//     .then((x)=> {
//         router.locals.navdata = x;
//     })
//     .catch((y) => {
//         console.log(y)
//     })

// router.use((req, res, next) => {
//     pageModel.find({})
//         .then((x) => {
//             res.locals.navdata = x; //here set local variable  and then value
//             //console.log(x)
//         })
//         .catch((y) => {
//             console.log(y)
//         })
//     next()
// })


router.get('/',(req, res)=>{
    pageModel.find({})
    .then((x)=>{
        res.render('../views/frontent/index', {x})
    })
    
})

router.get('/:id',(req, res)=>{
    pageModel.findOne({mainUrl:req.params.id})
    .then((x)=>{
       if(x){
        res.render('../views/frontent/page-view', {x})
       }
       else{
           res.redirect('/')
       }
    }).catch((y)=>{

    })
    
})




module.exports = router