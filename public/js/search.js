// Code here handles queries for specific recipes in the database
// In this case, the user submits a recipe name... we then pass that recipe name as a
// URL parameter. Our server then performs the search to grab that recipe from the Database.
// when user hits the search-btn

function getRecipes(){
  $.get('/api/recipes', function(data) {

  }).done(function(data) {
    displayRecipes(data);

  });
}

function displayRecipes(data) {

  for (i = 0; i < data.length && i < 4 ; i++ ){
    var well = $('#well-section');
    //well.append("<img class='img' id='" + data[i].id + "' src='" + data[i].image + "'>"); //error
    var recipeImg = $("<img>");
    recipeImg.addClass("img");
    recipeImg.attr("id", data[i].id);
    //recipeImg.attr("src", "http://images2.fanpop.com/image/photos/13700000/Darth-Vader-Wallpaper-darth-vader-13703254-1024-768.jpg");
    // recipeImg.attr("src", data[i].image);
    well.append(recipeImg);

    //var url = window.URL || window.webkitURL;
    //well.append("<img src='" + url.createObjectURL(data[i].image) + "'>");
    well.append("<label class='title'>" + data[i].title + "</label>&nbsp;&nbsp;");
    well.append("Posted by</label>&nbsp;&nbsp;" + data[i].author + "<br>");

    /*
    well.append("&nbsp;&nbsp;<label class='item'>Cook Time</label>&nbsp;&nbsp;" + data[i].cook_time + "min<br>");
    well.append("&nbsp;&nbsp;<label class='item'>Servings</label>&nbsp;&nbsp;" + data[i].servings + "<br>");
    well.append("&nbsp;&nbsp;<label class='item'>Ingredients</label><br>");
    var ingArr = data[i].ingredients.split(/\n/g);
    console.log(ingArr);
    for (j = 0; j < ingArr.length; j++ ){
      well.append("&nbsp;&nbsp;&nbsp;<input type='checkbox'>&nbsp;" + ingArr[j] + "<br>");
    }
    //well.append("<input type='checkbox'>&nbsp;" + data[i].ingredients.replace(/\n/g,'<br>') + "<br>");
    //well.append(data[i].author + "<br>");

    //well.append(data[i].directions.replace(/\n/g,'<br>') + "<br>");
    well.append("&nbsp;&nbsp;<label class='item'>Directions</label><br>");
    var dirArr = data[i].directions.split(/\n/g);
    console.log(dirArr);
    for (j = 0; j < dirArr.length; j++ ){
      well.append("&nbsp;&nbsp;&nbsp;<input type='checkbox'>&nbsp;" + dirArr[j] + "<br>");
    }

    var likeBtn = $("<span>");
    //likeBtn.text(data[i].thumbs_up);
    likeBtn.attr("data-id", data[i].id);
    likeBtn.attr("id", "like_" + data[i].id);
    likeBtn.attr("clicked", "false");
    likeBtn.addClass("glyphicon glyphicon-thumbs-up like unclicked");
    var likeLabel = $("<label>");
    likeLabel.text(" " + data[i].thumbs_up + " ");
    likeLabel.attr("id", "up_" + data[i].id);
    well.append(likeBtn);
    well.append("&nbsp;");
    well.append(likeLabel);

    well.append("&nbsp;&nbsp;&nbsp;");

    var dislikeBtn = $("<span>");
    //dislikeBtn.text(data[i].thumbs_down);
    dislikeBtn.attr("data-id", data[i].id);
    dislikeBtn.attr("id", "dislike_" + data[i].id);
    dislikeBtn.attr("clicked", "false");
    dislikeBtn.addClass("glyphicon glyphicon-thumbs-down dislike unclicked");
    var dislikeLabel = $("<label>");
    dislikeLabel.text(" " + data[i].thumbs_down + " ");
    dislikeLabel.attr("id", "down_" + data[i].id);
    well.append(dislikeBtn);
    well.append("&nbsp;");
    well.append(dislikeLabel);
    */

    well.append("<hr>");
  };
}


getRecipes();

$("#search-btn").on("click", handleSearch);

function handleSearch(){
  // save the recipe they typed into the recipe-search input
  var searchedRecipe = $("#recipe-search").val().trim();
  // replace any spaces between that recipe with no space
  // (effectively deleting the spaces). Make the string lowercase
  searchedRecipe = searchedRecipe.replace(/\s+/g, "").toLowerCase();
  if(!searchedRecipe){ 
    return;
  }

  // run an AJAX GET-request for our servers api,
  // including the user's recipe in the url
   $.get("/api/recipes/title/" + searchedRecipe, function(data) {
    // log the data to our console
    console.log(data);
    //empty to well-section before adding new content
    $("#well-section").empty();
    // if the data is not there, then return an error message
    if (data.length === 0) {
      $("#well-section").append("<h2> Sorry! Your recipe was not found. </h2>");
    }
    // otherwise
    else {
      $("#well-section").append("search results");
      displayRecipes(data);
    }
  });
}

$("#recipe-search").on("keyup", function(e){
  if(e.keyCode===13){
    $("#search-btn").click();
  }
});


// Listen to LIKE and DISLIKE button clicked
$(document).on("click", "span.like", handleRecipeLike);
$(document).on("click", "span.dislike", handleRecipeDislike);

// LIKE button
function handleRecipeLike() {
  var currentRecipe = $(this);
  console.log(currentRecipe);
  console.log($(this).attr("data-id"));
  if ($(this).attr("clicked") === "false"){
    likeRecipe(currentRecipe.attr("data-id"));
    $(this).attr("clicked","true");
    $(this).removeClass("unclicked");
    $(this).addClass("clicked");
  }
  else {
    cancelLike($(this).attr("data-id"));
    $(this).attr("clicked","false");
    $(this).removeClass("clicked");
    $(this).addClass("unclicked");
  }
}

// Like button clicked first
function likeRecipe(id) {
  $.ajax({
    method: "PUT",
    url: "/api/recipes/like/" + id
  })
  .then(function(data){
    //$('#well-section').empty();
    getCounter(id);
    //console.log(data[0].id);//undefined
    //$("#up_" + data[0].id).text(data[0].thumbs_up);
  });
}

// Like button clicked twice
function cancelLike(id) {
  $.ajax({
    method: "PUT",
    url: "/api/recipes/cancelLike/" + id
  })
  .then(function(data){
    //$('#well-section').empty();
    getCounter(id);
    //console.log(data[0].id);//undefined
    //$("#up_" + data[0].id).text(data[0].thumbs_up);
  });
}

// DISLIKE button
function handleRecipeDislike() {
  var currentRecipe = $(this);
  console.log(currentRecipe);
  if ($(this).attr("clicked") === "false"){
    dislikeRecipe(currentRecipe.attr("data-id"));
    $(this).attr("clicked","true");
    $(this).removeClass("unclicked");
    $(this).addClass("clicked");
  }
  else {
    cancelDislike($(this).attr("data-id"));
    $(this).attr("clicked","false");
    $(this).removeClass("clicked");
    $(this).addClass("unclicked");
  }
}

function dislikeRecipe(id) {
  $.ajax({
    method: "PUT",
    url: "/api/recipes/dislike/" + id
  })
  .then(function(){
    //$('#well-section').empty();
    getCounter(id);
  });
}

function cancelDislike(id) {
  $.ajax({
    method: "PUT",
    url: "/api/recipes/cancelDislike/" + id
  })
  .then(function(){
    //$('#well-section').empty();
    getCounter(id);
  });
}

// Update Like and Dislike counters
function getCounter(id) {
  $.get('/api/recipes/' + id, function(data) {
    if(data){
      $("#up_" + id).text(data.thumbs_up);
      $("#down_" + id).text(data.thumbs_down);
    }
  });
}

// Display detail on Modal
$("#well-section").on("click", ".img",function() {
  console.log($(this).attr("id"));

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
    $('#recipeContent').text(data.ingredients);

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
