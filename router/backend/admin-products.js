let express = require('express')
let productModel = require('../../model/productModel')
let catModel = require('../../model/categorymodel')
let router = express()

//find category then set local variable for use in add product page (like Products.ejs)

router.use((req, res, next) => {
    catModel.find({})
        .then((x) => {
            res.locals.catdata = x; //here set local variable  and then value
        })
        .catch((y) => {
            console.log(y)
        })
    next()
})





router.get('/', (req, res)=>{
    productModel.find({})
    .then((x)=>{
        res.render('../views/backend/Products.ejs', {x})
    })
    .catch((y)=>{
        console.log(y)
    })
   
})

router.get('/add-products/', (req, res)=>{
    catModel.find({})
    .then((x)=>{
        res.render('../views/backend/productsAdd.ejs', {x})
    })   
    //Note : ismen category data ko bhejne ke liye  " catModel.find({}) " kaa use kiya gaya hai 
})

router.post('/add-products/', (req, res)=>{

    console.log(req.body.product_Cat)
    if(req.body.product_Cat=='Select Your Category'){
        console.log('you have not selet any category Please Select Your Category')
    }
    else if(!req.body.product_Url){     
          console.log('You have not input any Url, Please Input')
    }
    else if(!req.body.product_Nav_Text){     
        console.log('You have not Nav text, Please Input')
    }
    else if(!req.body.product_Title){     
        console.log('You have not input Product Title, Please Input')
    }
    else if(!req.body.product_Heading){     
        console.log('You have not input Product Title, Please Input')
    }
    else{
        productModel.findOne({productUrl:req.body.product_Url})
        .then((a)=>{
            if(a){
                console.log('You have use this url, Please use another url')
            }
            else{
                productModel.create({
                    productCat		            : 	    req.body.product_Cat,
                    productCatUrl               :       req.body.product_cat_Url,
                    productUrl 		            :	    req.body.product_Url,
                    productNavText 	            :	    req.body.product_Nav_Text,
                    productTitle 		        :	    req.body.product_Title,
                    productMetaDescrition       :	    req.body.product_Meta_Descrition,
                    productMetaKeyword          :	    req.body.product_Meta_Keyword,
                    productHeading	            :	    req.body.product_Heading,
                    productyoutube 	            :	    req.body.product_youtube,
                    productDetails 	            :	    req.body.product_Details
                })
                .then((x)=>{
                    req.flash('sucess', 'Your Data has been created on Data base')
                    res.redirect('/admin/products/')
                })
            }
        })
        .catch((y)=>{
            console.log(y)
        })    
    }
    
})

router.get('/edit/:id', (req, res)=>{
    productModel.findOne({productUrl:req.params.id})
    .then((x)=>{
      res.render('../views/backend/productsEdit.ejs', {x})
      
    })      
})

router.put('/edit/:id', (req, res)=>{

    productModel.updateOne({productUrl:req.params.id}, {$set:{
        productCat		            : 	    req.body.product_Cat,
        productCatUrl               :       req.body.product_cat_Url,
        productUrl 		            :	    req.body.product_Url,
        productNavText 	            :	    req.body.product_Nav_Text,
        productTitle 		        :	    req.body.product_Title,
        productMetaDescrition       :	    req.body.product_Meta_Descrition,
        productMetaKeyword          :	    req.body.product_Meta_Keyword,
        productHeading	            :	    req.body.product_Heading,
        productyoutube 	            :	    req.body.product_youtube,
        productDetails 	            :	    req.body.product_Details
    }})
    .then((x)=>{
        req.flash('sucess', 'Your Data has been Sucessfully Updated')
        res.redirect('/admin/products/')
        
    }).catch((y)=>{
        console.log(y)
    })
       
})



router.delete('/delete/:id', (req, res)=>{

    productModel.deleteOne({productUrl:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has been Sucessfully Deleted')
        res.redirect('/admin/products/')
        
    }).catch((y)=>{
        console.log(y)
    })
       
})


module.exports = router