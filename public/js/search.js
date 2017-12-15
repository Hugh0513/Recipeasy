// Code here handles queries for specific recipes in the database
// In this case, the user submits a recipe name... we then pass that recipe name as a
// URL parameter. Our server then performs the search to grab that recipe from the Database.
// when user hits the search-btn
$("#search-btn").on("click", function() {
  // save the recipe they typed into the character-search input
  var searchedRecipe = $("#recipe-search").val().trim();
  // replace any spaces between that recipe with no space
  // (effectively deleting the spaces). Make the string lowercase
  searchedRecipe = searchedRecipe.replace(/\s+/g, "").toLowerCase();
  // run an AJAX GET-request for our servers api,
  // including the user's recipe in the url
   $.get("/api/" + searchedRecipe, function(data) {
    // log the data to our console
    console.log(data);
    //empty to well-section before adding new content
    $("#well-section").empty();
    // if the data is not there, then return an error message
    if (!data) {
      $("#well-section").append("<h2> Sorry! Your recipe was not found. </h2>");
    }
    // otherwise
    else {
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
    }
  });
});