$(document).ready(function() {

  function getRecipes(){
    $.get('/api/recipes', function(data) {

    }).done(function(data) {
      //console.log(data[0].title);
      var well = $('#well-section');
      well.append("<hr>");
      for (i = 0; i < data.length; i++ ){
      //well.append("<img scr='"+data[i].img+"'>");
      well.append("Title: <font size='5'>" + data[i].title + "</font>      ");
      //well.append(data[i].cook_time + "<br>");
      //well.append(data[i].servings + "<br>");
      //well.append(data[i].ingredients + "<br>");
      //well.append(data[i].thumbs_up + "<br>");
      well.append("posted by " + data[i].author + "<br>");
      //well.append(data[i].directions + "<br>");

      var deleteBtn = $("<button>");
      deleteBtn.text("DELETE");
      deleteBtn.attr("id", data[i].id);
      deleteBtn.addClass("delete");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.attr("id", data[i].id);
      editBtn.addClass("edit");

      well.append(deleteBtn);
      well.append(editBtn);

      // well.append("<button class='thumbsUp' data-id='"+data[i].id+"'>&#128077;</button><button class= 'thumbsDown' data-id='"+data[i].id+"'>&#128078;</button>");
      // well.append("<button class='share' data-id='"+data[i].id+"'><img src='images/' width=25 height=25 alt='share'></button>");
      well.append("<hr>");
      };
    });
  }

  getRecipes();

  // Search
  $("#search-btn").on("click", function() {
    // save the recipe they typed into the recipe-search input
    var searchedRecipe = $("#recipe-search").val().trim();
    // replace any spaces between that recipe with no space
    // (effectively deleting the spaces). Make the string lowercase
    searchedRecipe = searchedRecipe.replace(/\s+/g, "").toLowerCase();
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
          //well.append("<img scr='"+data[i].img+"'>");
          well.append(data[i].title + "<br>");
          well.append(data[i].cook_time + "<br>");
          well.append(data[i].servings + "<br>");
          well.append(data[i].ingredients + "<br>");
          well.append(data[i].thumbs_up + "<br>");
          well.append(data[i].author + "<br>");
          well.append(data[i].directions + "<br>");
          // well.append("<button class='thumbsUp' data-id='"+data[i].id+"'>&#128077;</button><button class= 'thumbsDown' data-id='"+data[i].id+"'>&#128078;</button>");
          // well.append("<button class='share' data-id='"+data[i].id+"'><img src='images/' width=25 height=25 alt='share'></button>");
          
          var deleteBtn = $("<button>");
          deleteBtn.text("DELETE");
          deleteBtn.attr("id", data[i].id);
          deleteBtn.addClass("delete");
          var editBtn = $("<button>");
          editBtn.text("EDIT");
          editBtn.attr("id", data[i].id);
          editBtn.addClass("edit");

          well.append(deleteBtn);
          well.append(editBtn);

          well.append("<hr>");
        }

      }
    });
  });

  // Listen to DELETE and EDIT button clicked
  $(document).on("click", "button.delete", handleRecipeDelete);
  $(document).on("click", "button.edit", handleRecipeEdit);

  // DELETE
  function handleRecipeDelete() {
    var currentRecipe = $(this);
    console.log(currentRecipe);
    deleteRecipe(currentRecipe.attr("id"));
  }

  function deleteRecipe(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/recipes/" + id
    })
    .done(function() {
    
    })
    .then(function(){
      $('#well-section').empty();
      getRecipes();
    });
  }

  // EDIT 
  function handleRecipeEdit() {
    var currentPost = $(this);
    window.location.href = "/edit?recipe_id=" + currentPost.attr("id");
  }


  $("#recipe-search").on("keyup", function(e){
    if(e.keyCode===13){
      $("#search-btn").click();
    }
  });

});