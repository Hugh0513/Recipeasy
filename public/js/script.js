var numHeroImages = 8;

document.addEventListener("DOMContentLoaded", init);
function init() {
	var heroImg = document.querySelector("#home main img, #search output img");
	if(heroImg){
		var randomHero = Math.floor(Math.random()*numHeroImages);
		heroImg.src="images/hero"+randomHero+".jpg";	
		setInterval(function(){
			randomHero++;
			if(randomHero>=numHeroImages) {
				randomHero=0;
			}
			document.querySelector("#home main img, #search output img").outerHTML="<img src='images/hero"+randomHero+".jpg'>";
		}, 2000);
		
	}
	// var searchSubmit = document.querySelector("#search main input[type='submit']");
	// if(searchSubmit) {
	// 	searchSubmit.addEventListener("click", doSearch);
	// }	
}

// function doSearch(e) {
// 	e.preventDefault();
// 	var searchString = e.target.previousElementSibling.value;
// 	e.target.previousElementSibling.value = "";
// 	var req = new XMLHttpRequest();
// 	req.onreadystatechange = function(){
// 		if(req.readyState ===4) {
// 			if(req.status ===200) {
// 				showSearchResults(JSON.parse(req.responseText));
// 			} else {
// 				// error
// 			}
// 		} 
// 	}
// 	req.open("GET", "/search/"+searchString, true);
// 	req.send();
// }

// function showSearchResults(data) {
	// console.log(data);
// }