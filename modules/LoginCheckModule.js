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

	return {
		loginCheck : loginCheck,
		loginCheckHome : loginCheckHome
	}

})();

module.exports = LoginCheckModule;