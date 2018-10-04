function addLoadEvent(func){
	var oldonlod = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonlod();
			func();
		}
	}
}
function my$(id){
	return document.getElementById(id);
}