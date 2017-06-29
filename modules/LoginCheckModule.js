var LoginCheckModule = (function(){

	// for user page
	function loginCheck(req, res, next) {
	    if(req.session.user){
	        next();
	    }else{
	        res.redirect('/login');
	    }
	}

	// for home page
	function loginCheckHome(req, res, next){
		if(req.session.user){
			res.redirect('/users');
		}else{
			next();
		}
	}

	// for application interface
	function apikeyCheck(req, res, next){
		var apikey = req.body.apikey || req.query.apikey;
		if(apikey || req.session.user){
			next();
		}else{
			res.json({err:'Faild to get api.'})
		}
	}

	return {
		loginCheck : loginCheck,
		loginCheckHome : loginCheckHome,
		apikeyCheck : apikeyCheck
	}

})();

module.exports = LoginCheckModule;