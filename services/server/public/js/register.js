(function(){
	
	// get query string value by name
	function queryByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	/**
	 * Display alert message if available by query string 'type' & 'message'
	 */
	var type = queryByName('type');
	if(type){
		var alert = document.getElementsByClassName('alert')[0];
		var message = document.getElementsByClassName('message')[0];
		message.innerHTML = queryByName('message');
		alert.classList.add(type);
		alert.classList.remove( 'hide' );
	}

	/**
	 * Check retype password is the same as password 
	 */
	var password1 = document.getElementById('password');
	var password2 = document.getElementById('password2');

	var checkPassword = function(e){
		var btn = document.getElementById('register-btn');
		btn.disabled = !password1.value || !password2.value || password1.value != password2.value;
	}

	password1.addEventListener('keyup', checkPassword);
	password2.addEventListener('keyup', checkPassword);

})()
