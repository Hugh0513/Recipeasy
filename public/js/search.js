// Code here handles queries for specific recipes in the database
// In this case, the user submits a recipe name... we then pass that recipe name as a
// URL parameter. Our server then performs the search to grab that recipe from the Database.
// when user hits the search-btn

function getRecipes(){
  $.get('/api/recipes', function(data) {

  }).done(function(data) {
    console.log(data[0].title);
    for (i = 0; i < data.length && i < 4 ; i++ ){
      var well = $('#well-section');
      well.append("<img scr='"+data[i].img+"'>");
      well.append(data[i].title + "<br>");
      well.append(data[i].cook_time + "<br>");
      well.append(data[i].servings + "<br>");
      well.append(data[i].ingredients + "<br>");
      well.append(data[i].author + "<br>");
      well.append(data[i].directions + "<br>");
      // well.append("<button class='thumbsUp' data-id='"+data[i].id+"'>&#128077;</button><button class= 'thumbsDown' data-id='"+data[i].id+"'>&#128078;</button>");
      // well.append("<button class='share' data-id='"+data[i].id+"'><img src='images/' width=25 height=25 alt='share'></button>");

      var likeBtn = $("<span>");
      //likeBtn.text(data[i].thumbs_up);
      likeBtn.attr("data-id", data[i].id);
      likeBtn.attr("id", "like_" + data[i].id);
      likeBtn.attr("clicked", "false");
      likeBtn.addClass("glyphicon glyphicon-thumbs-up like unclicked");
      var likeLabel = $("<label>");
      likeLabel.text(" " + data[i].thumbs_up + " ");
      likeLabel.attr("id", "up_" + data[i].id);
      likeBtn.append(likeLabel);
      well.append(likeBtn);

      var dislikeBtn = $("<span>");
      //dislikeBtn.text(data[i].thumbs_down);
      dislikeBtn.attr("data-id", data[i].id);
      dislikeBtn.attr("id", "dislike_" + data[i].id);
      dislikeBtn.attr("clicked", "false");
      dislikeBtn.addClass("glyphicon glyphicon-thumbs-down dislike unclicked");
      var dislikeLabel = $("<label>");
      dislikeLabel.text(" " + data[i].thumbs_down + " ");
      dislikeLabel.attr("id", "down_" + data[i].id);
      dislikeBtn.append(dislikeLabel);
      well.append(dislikeBtn);

      //this doesn't work 
      //well.append('<a class="like" id="up_' + data[i].id + '"><span class="glyphicon glyphicon-thumbs-up">' + data[i].thumbs_up + '</span></a>')

      well.append("<hr>");
    };
  });
}

getRecipes();


$("#search-btn").on("click", function() {
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
    if (!data.length === 0) {
      $("#well-section").append("<h2> Sorry! Your recipe was not found. </h2>");
    }
    // otherwise
    else {
      /*
      // append the recipe title
      $("#well-section").append("<h2>" + data.title + "</h2>");
      // cook time
      $("#well-section").append("<h3>Cook Time: " + data.cookTime + "</h3>");
      // servings
      $("#well-section").append("<h3>Servings: " + data.servings + "</h3>");
      // ingredients
      $("#well-section").append("<h3>Ingredients: " + data.ingredients+ "</h3>");
      // thumbs up
      $("#well-section").append("<h3>Thumbs Up: " + data.thumbsUp+ "</h3>");
      // author
      $("#well-section").append("<h3>Author: " + data.author+ "</h3>");
      // directions
      $("#well-section").append("<h3>Directions: " + data.directions+ "</h3>");
      */
      for (i = 0; i < data.length && i < 4 ; i++ ){
        var well = $('#well-section');
        well.append("<img scr='"+data[i].img+"'>");
        well.append(data[i].title + "<br>");
        well.append(data[i].cook_time + "<br>");
        well.append(data[i].servings + "<br>");
        well.append(data[i].ingredients + "<br>");
        well.append(data[i].author + "<br>");
        well.append(data[i].directions + "<br>")
        well.append(data[i].thumbs_up + "<br>");;
        // well.append("<button class='thumbsUp' data-id='"+data[i].id+"'>&#128077;</button><button class= 'thumbsDown' data-id='"+data[i].id+"'>&#128078;</button>");
        // well.append("<button class='share' data-id='"+data[i].id+"'><img src='images/' width=25 height=25 alt='share'></button>");
        well.append("<hr>");
      };
    }
  });
});

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
