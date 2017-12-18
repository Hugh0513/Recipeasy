$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  //var bodyInput = $("#body");
  var titleInput = $("#title");
  //var photoInput = $("#photo");
  var cookTimeInput = $("#cook_time");
  var servingsInput = $("#servings");
  var ingredientsInput = $("#ingredients");
  var authorInput = $("#author");
  var directionsInput = $("#directions");
  
  // UPDATA butten clicked
  $("#update-btn").on("submit", handleFormSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var recipeId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?recipe_id=1', recipeId is 1
  if (url.indexOf("?recipe_id=") !== -1) {
    recipeId = url.split("=")[1];
    console.log(recipeId);
    getRecipeData(recipeId, "post");
  console.log(updating);
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }


  function handleFormSubmit(event) {
    console.log("clicked");
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !ingredientsInput.val().trim() || !directionsInput.val().trim() || !authorInput.val()) {
      return;
    }

    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput.val().trim(),
      cookTime: cookTimeInput.val().trim(),
      servings: servingsInput.val().trim(),
      ingredients: ingredientsInput.val().trim(),
      directions: directionsInput.val().trim(),
      category: postCategorySelect.val(),
      AuthorId: authorSelect.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updateRecipe(newPost);
    }
    else {
      console.log("newPost");
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitRecipe(Post) {
      console.log("post");
    $.post("/api/recipes/", Post, function() {
      window.location.href = "/manage";
    });
  }

  // Gets recipe data for a recipe if we're editing
  function getRecipeData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/recipes/" + id;
        break;
      case "author":
        queryUrl = "/api/authors/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        // If this recipe exists, prefill our cms forms with its data
        titleInput.val(data.title);
        //bodyInput.val(data.body);
        //authorId = data.AuthorId || data.id || data.author;

        //photoInput.val(data.photo);
        cookTimeInput.val(data.cook_time);
        servingsInput.val(data.servings);
        ingredientsInput.val(data.ingredients);
        authorInput.val(data.author);
        directionsInput.val(data.directions);

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;

        console.log(updating);
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateRecipe(post) {
    $.ajax({
      method: "PUT",
      url: "/api/recipes",
      data: post
    })
    .done(function() {
      window.location.href = "/manage";
    });
  }


});
