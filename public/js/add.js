$('#add-btn').on('click', function(event) {
  event.preventDefault();

 console.log($('#image').val());

 var fileChooser = $('#file-chooser').val()
  console.log(fileChooser.slice(12));

 // make a newRecipe obj
  var newRecipe = {
    // title from title input
    title: $('#title').val(),

    image: fileChooser.slice(12),
    // cook time from cook time input
    cook_time: $('#cook_time').val(),
    // servings from servings input
    servings: $('#servings').val(),
    // ingredients from ingredients input
    ingredients: $('#ingredients').val(),
    // thumbs up from thumbs up input
    //thumbs_up: $('#thumbs_up').val().trim()
    thumbs_up: 0,
    // author from author input
    author: $('#author').val(),
    // directions from directions input
    directions: $('#directions').val() //,

   //image: fs.readFileSync($('#image').val())
  };

  console.log(newRecipe);
  // send an AJAX POST-request with jQuery
  $.post('/api/recipes', newRecipe)
    // on success, run this callback
    .done(function(data) {
      // log the data we found
      //console.log(data);
      // tell the user we're adding a recipe with an alert window
      alert('Adding Recipe...');

  });
  upLoadImage();
  // empty each input box by replacing the value with an empty string
  $('#title').val('');
  $('#cook_time').val('');
  $('#servings').val('');
  $('#file-chooser').val('')
  $('#ingredients').val('');
  $('#thumbs_up').val('');
  $('#author').val('');
  $('#directions').val('');
  $('#image').val('');

});

// Grab a reference to the upload button
//var uploadButton = document.getElementById('upload-button');

// Make the button respond to clicks
function upLoadImage() {
  console.log('adding an image')
  AWS.config.update({
  accessKeyId: 'S3_KEY_ID', // For security reason, this is masked
  secretAccessKey: 'S3_ACCESS_KEY', // For security reason, this is masked
  region: 'us-east-1'
  });

 var S3 = new AWS.S3({params: {Bucket: 'recipeasy-app'}});
  var fileChooser = $('#file-chooser').val();
  console.log(fileChooser);
  var file = $('#file-chooser').get(0).files[0];
  var fileName = fileChooser.slice(12);
  console.log(fileName);

  // Check that the user has specified a file to upload
  if (!file) {
    alert('You must choose a file to upload!');
    return;
  }

 // Specify the S3 upload parameters
  var params = {
    Key: file.name,
    ContentType: file.type,
    Body: file,
    ACL: 'public-read'
  };

 // Upload the file
  S3.upload(params, function(err, data) {
    if (err) {
      alert(err);
    } else {
      console.log('Image uploaded successfully!');

   }
      img = 'https://s3.amazonaws.com/recipeasy-app/' + fileName
  console.log(img);
  console.log(fileChooser);
  $('#recipeImg').attr('src', img);
  });

};