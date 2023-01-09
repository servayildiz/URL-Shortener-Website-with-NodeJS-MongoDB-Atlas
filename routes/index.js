var express = require('express');
var router = express.Router();
var users = require('../models/user');

router.get('/sign_in', function (req, res, next) {
	return res.render('sign_in.ejs');
});


router.post('/sign_in', function(req, res, next) {
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
					router.get('/login', function (req, res, next) {
						return res.render('login.ejs');
					});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});



router.post('/login', function (req, res, next) {
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

router.get('/layout', function (req, res, next) {
	console.log("layout");
	users.findOne({unique_id:req.session.userId},function(err,data){
		console.log("layout");
		console.log(data);
		if(!data){
			res.redirect('/sign_in');
		}else{
			//console.log("found");
			return res.render('layout.ejs', {"name":data.username,"email":data.email});
		}
	});
});

router.get('/logout', function (req, res, next) {
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

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
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
//post request
router.post('/', async (req, res) => {
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
  router.get('/:customUrl', async (req, res) => {	
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
  
module.exports = router;