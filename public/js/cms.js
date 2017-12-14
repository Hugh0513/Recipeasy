$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  //var bodyInput = $("#body");
  var titleInput = $("#title");
  var discriptionInput = $("#discription");
  var photoInput = $("#photo");
  var cookTimeInput = $("#cookTime");
  var servingsInput = $("#servings");
  var ingredientsInput = $("#ingredients");
  var directionsInput = $("#directions");
  var cmsForm = $("#cms");
  var postCategorySelect = $("#category");
  var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  getAuthors();


  function handleFormSubmit(event) {
    console.log("clicked");
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !ingredientsInput.val().trim() || !directionsInput.val().trim() || !authorSelect.val()) {
      return;
    }
    console.log("ok");
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput.val().trim(),
      discription: discriptionInput.val().trim(),
      photo: photoInput.val().trim(),
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
      updatePost(newPost);
    }
    else {
      console.log("newPost");
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
      console.log("post");
    $.post("/api/posts/", Post, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "author":
        queryUrl = "/api/authors/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id)
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        //bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;

        discriptionInput.val(data.discription);
        photoInput.val(data.photo);
        cookTimeInput.val(data.cookTime);
        servingsInput.val(data.servings);
        ingredientsInput.val(data.ingredients);
        directionsInput.val(data.directions);
        postCategorySelect.val(data.category);

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  function getAuthors() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/authors";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }

  $("#addIng").on("click", addIngRow);
  var counter = 0;
  function addIngRow(){
    counter++;
    console.log("clicked");

  }

  $("#addMethod").on("click", addMethodRow);
  var counter = 0;
  function addMethodRow(){
    counter++;
    console.log("clicked");

  }

});
