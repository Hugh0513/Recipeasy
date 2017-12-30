$(document).ready(function() { // Without this, on"click" doesn't work.

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


	function getRecipes(){
	  $.get('/api/recipes/order', function(data) {

	  }).done(function(data) {
	    console.log(data[0].title);

	    displayRecipes(data);
	  });
	}

	function displayRecipes(data) {
		console.log(data.length);
		for (i = 0; i < data.length && i < 5 ; i++ ){
		var recipeLink = $("<a>");
		recipeLink.addClass("rank");
		recipeLink.attr("id", data[i].id);
		var num = i + 1;
		recipeLink.text("#" + num + "  " + data[i].title);
		$('#best5').append(recipeLink);
		};
	}

	getRecipes();


	// Display detail on Modal
	$("#best5").on("click", ".rank",function() {
	  console.log($(this).attr("id"));
	  console.log("click");

	  // Grab the URL of the website
	  var currentURL = window.location.origin;
	  
	  $.get(currentURL + "/api/recipes/" + $(this).attr("id"), function(data){

	    // Initialize
	    $('#recipeTitle').empty();
	    $('#recipeImg').empty();
	    $('#recipeContent').empty();
	    $('#likeArea').empty();

	    $("#recipeTitle").text(data.title);
	    //console.log(data.photo);
	    $('#recipeImg').attr("src", data.image);
	    $('#recipeCountent').text(data.ingredients);

	    var well = $('#recipeContent');

	    well.append("&nbsp;&nbsp;<label class='item'>Cook Time</label>&nbsp;&nbsp;" + data.cook_time + "min<br>");
	    well.append("&nbsp;&nbsp;<label class='item'>Servings</label>&nbsp;&nbsp;" + data.servings + "<br>");
	    well.append("&nbsp;&nbsp;<label class='item'>Ingredients</label><br>");
	    var ingArr = data.ingredients.split(/\n/g);
	    console.log(ingArr);
	    for (j = 0; j < ingArr.length; j++ ){
	      well.append("&nbsp;&nbsp;&nbsp;<input type='checkbox'>&nbsp;" + ingArr[j] + "<br>");
	    }
	    //well.append("<input type='checkbox'>&nbsp;" + data[i].ingredients.replace(/\n/g,'<br>') + "<br>");
	    //well.append(data[i].author + "<br>");

	    //well.append(data[i].directions.replace(/\n/g,'<br>') + "<br>");
	    well.append("&nbsp;&nbsp;<label class='item'>Directions</label><br>");
	    var dirArr = data.directions.split(/\n/g);
	    console.log(dirArr);
	    for (j = 0; j < dirArr.length; j++ ){
	      var num = j + 1;
	      well.append("&nbsp;&nbsp;&nbsp;<input type='checkbox'>&nbsp;" + num.toString() + ".&nbsp;" + dirArr[j] + "<br>");
	    }

	    var likeArea = $("#likeArea");

	    var likeBtn = $("<span>");
	    //likeBtn.text(data[i].thumbs_up);
	    likeBtn.attr("data-id", data.id);
	    likeBtn.attr("id", "like_" + data.id);
	    likeBtn.attr("clicked", "false");
	    likeBtn.addClass("glyphicon glyphicon-thumbs-up like unclicked");
	    var likeLabel = $("<label>");
	    likeLabel.text(" " + data.thumbs_up + " ");
	    likeLabel.attr("id", "up_" + data.id);
	    likeArea.append(likeBtn);
	    likeArea.append("&nbsp;");
	    likeArea.append(likeLabel);

	    likeArea.append("&nbsp;&nbsp;&nbsp;");

	    var dislikeBtn = $("<span>");
	    //dislikeBtn.text(data[i].thumbs_down);
	    dislikeBtn.attr("data-id", data.id);
	    dislikeBtn.attr("id", "dislike_" + data.id);
	    dislikeBtn.attr("clicked", "false");
	    dislikeBtn.addClass("glyphicon glyphicon-thumbs-down dislike unclicked");
	    var dislikeLabel = $("<label>");
	    dislikeLabel.text(" " + data.thumbs_down + " ");
	    dislikeLabel.attr("id", "down_" + data.id);
	    likeArea.append(dislikeBtn);
	    likeArea.append("&nbsp;");
	    likeArea.append(dislikeLabel);

	    $("#resultsModal").modal('toggle');

	  });

	});

});