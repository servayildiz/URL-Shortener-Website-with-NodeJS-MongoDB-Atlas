let express = require('express')
let productModel = require('../../model/productModel')
let catModel = require('../../model/categorymodel')
let router = express()

// router.get('/:id',(req, res, next)=>{
//     catModel.findOne({category:req.params.id})
//     .then((x)=>{
//         res.locals.catdata = x; 
//        // console.log(x)  
//     })
//     next()
// })



router.get('/',(req, res)=>{
    catModel.find({})
    .then((x)=>{
       if(x){
      res.render('../views/frontent/courses', {x})
       }
       else{
           res.redirect('/')
       }
    }).catch((y)=>{

    })    
})


router.get('/:id',(req, res,)=>{
    productModel.find({productCatUrl:req.params.id})
    .then((x)=>{
        console.log(x)
       if(x){
        //find for setting  titele and meta
        catModel.findOne({categoryUrl:req.params.id})
        .then((a)=>{
            res.locals.catdata = a;
            res.render('../views/frontent/product-landing', {x, a})
           //console.log(res.locals.catdata)
        })
       }
       else{
           res.redirect('/')
       }
    }).catch((y)=>{

    })  

})


router.get('/:id/:id',(req, res)=>{
    productModel.findOne({productUrl:req.params.id})
    .then((x)=>{
       if(x){
        res.render('../views/frontent/product-details', {x})
       }
       else{
           res.redirect('/')
       }
    }).catch((y)=>{

    })
    
})







module.exports = router