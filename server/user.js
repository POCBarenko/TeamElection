Accounts.onCreateUser(function(opts, user){
	var email = user.emails[0].address;
	user.username = email.split("@")[0].replace('.', '_');
	user.hash = CryptoJS.SHA1(email).toString();
	return user;
});

Accounts.onLogin(function(){
	
});