const express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
const app = express();
let methodOverride = require('method-override')
let flash = require('connect-flash')
// var router = express.Router();

// 
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var session = require('express-session');
var MongoStore=require('connect-mongo');
mongoose.Promise=global.Promise;

app.use(express.static(__dirname+'/public/'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const expressEJs = require('express-ejs-layouts');
const users = require('./models/user');
const URLS = require('./models/ShortURL');



mongoose.connect('mongodb+srv://YazLab:<password>@cluster0.wdapfo8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});


app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://YazLab:<password>@cluster0.wdapfo8.mongodb.net/?retryWrites=true&w=majority'
  })
}));


app.use( express.static( "img" ) );

// 
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
// 

// 

// 

// var index = require('./routes/index');
// app.use('/', index);

//set ejs layout
app.use(expressEJs);

//setting viewengine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

//setup static
app.use(express.static(__dirname + '/assests'));

app.use(express.static(__dirname + '/backend'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

//global variables
app.use((req, res, next) => {
  res.locals.currentUrl =
    req.protocol + '://' + req.get('host') + req.originalUrl;
  next();
});





//pages
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req,res)=>{
  res.render('about');
})

app.get('/contact', (req, res)=>{
  res.render('contact');
})

app.get('/statisticks', (req, res)=>{
  res.render('statisticks')
})

// app.get('/sign_in', (req, res)=>{
//   res.render('sign_in')
// })

// app.get('/login', (req, res)=>{
//   res.render('login')
// })

// app.get('/forget', (req, res)=>{
//   res.render('forget')
// })

app.get('/home', (req, res)=>{
  res.render('home')
})




//
app.get('/sign_in', async (req, res)=> {
	return res.render('sign_in.ejs');
});


app.post('/sign_in', async(req, res) => {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			users.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					users.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						
						var newPerson = new users({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});


						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});

				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

app.get('/adminlogin', async (req, res) => {
	return res.render('adminlogin.ejs');
});

app.get('/login', async (req, res) => {
	return res.render('login.ejs');
});

app.post('/login', async (req, res) => {
	//console.log(req.body);
	users.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

app.get('/profile', async (req, res) => {
	console.log("profile");
	users.findOne({unique_id:req.session.userId},function(err,data){
		console.log("profile");
		console.log(data);
		if(!data){
			res.redirect('/sign_in');
		}else{
			//console.log("found");
			return res.render('profile.ejs', {"name":data.username,"email":data.email});
		}
	});
});

app.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/sign_in');
    	}
    });
}
});

app.get('/forgetpass', async (req, res) => {
	res.render("forget.ejs");
});

app.post('/forgetpass', async (req, res) => {
	//console.log('req.body');
	//console.log(req.body);
	users.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			//res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});


app.use(session({
	secret:'nodejs',
	resave:true,
	saveUninitialized:true
  }))
  app.use(flash())
  
  let pageModel = require('./model/pageModel')
  let productModel = require('./model/productModel')
  let catModel = require('./models/user')
  app.use((req, res, next)=>{
	  res.locals.sucess = req.flash('sucess') 
	  res.locals.err = req.flash('err')
	  //Note: yahan 'sucess' & 'err' globaly message set kiya jaa raha hai jiska use puer application men kahin bhi kiya jaa sakta hai    
	  
	  //PASS PAGE DATA TO ALL FRONTENT HEADER
		  pageModel.find({})
		  .then((x) => {
			  res.locals.navdata = x;         
		  })
		  .catch((y) => {
			 // console.log(y)
		  })
	  // PASS ALL COURSERS LIST TO ALL COURESE PAGES
		  productModel.find({})
		  .then((x)=>{
			  res.locals.allcourses = x;   
		  })
		  
	  //PASS ALL CATEGORY DATA ANY WHERE
	  catModel.find()
	  .then((x)=>{
		  res.locals.allcat = x
	  })
		 
	  
	  
	  next()
   })
  //===========BACKEND ROUTER START HERE
  
  let admin = require('./router/backend/admin')
  let adminpages = require('./router/backend/admin-page')
  let admincategory = require('./router/backend/admin-category')
  let adminproducts = require('./router/backend/admin-products')
  
  // set router
  app.use('/admin/', admin) // route admin
  app.use('/admin/pages/', adminpages) // top navigation like (home, about, contact,)
  app.use('/admin/category/', admincategory) //for category like (Java Script, NodeJs, Mongodb)
  app.use('/admin/products/', adminproducts) //for product like ( javascript related all topic || nodejs related All topic..)
  
  
  
  
  //BACKEND ROUTER END HERE
  let pages = require('./router/frontent/page')
  let course = require('./router/frontent/product');
const { appendFileSync } = require('fs');
  
  app.use('/course', course) 
  app.use('/pages', pages) 
  
  //===========FRONTENT ROUTER START HERE




//post request
app.post('/', async (req, res) => {
  let errors = [];
  const { mainUrl, currentUrl, customUrl } = req.body;
  const CUrlCount = await URLS.findOne({
    customUrl: customUrl,
  }).countDocuments();
  if (!mainUrl || !currentUrl || !customUrl) {
    errors.push({ msg: 'Lütfen tüm alanları doldurun' });
  }
  if (CUrlCount > 0) {
    errors.push({ msg: 'Bu URL daha önce kısaltıldı' });
  }
  if (errors.length > 0) {
    res.render('index', {
      errors,
    });
  } else {
    const URL = new URLS({
      mainUrl,
      currentUrl,
      customUrl,
    });

    URL.save();

    res.render('index', {
      currentUrl,
      customUrl,
    });
  }
});

//redirect to website
app.get('/:customUrl', async (req, res) => {
  const redirectUrl = await URLS.findOne({ customUrl: req.params.customUrl });
  const redirectUrlCount = await URLS.findOne({
    customUrl: req.params.customUrl,
  }).countDocuments();
  if (redirectUrlCount) {
    res.redirect(redirectUrl.mainUrl);
  } else {
    res.send('404 LINK NOT FOUND ');
  }
});



//port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
