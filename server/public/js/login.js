(function(){
	
	function queryByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	var type = queryByName('type');
	if(type){
		var alert = document.getElementsByClassName('alert')[0];
		var message = document.getElementsByClassName('message')[0];
		message.innerHTML = queryByName('message');
		alert.classList.add(type);
		alert.classList.remove( 'hide' );
	}

})()
