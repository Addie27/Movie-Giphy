var topics = ["moana", "boss baby", "toy story", "my little pony", "finding nemo", "shrek", "wreck-it ralph", "zootopia"]; 

function createButtons() {
    $("#movies-populate").empty();
    
    for (var i=0; i<topics.length; i++){
        var button = $("<button>");
        button.addClass("movie"); 
        button.attr("data-name", topics[i]); 
        button.text(topics[i]);
        $("#movies-populate").append(button); 
    }

  };//createButtons end

  createButtons();

function movieInfo(){
  var movieSelected = $(this).attr("data-name"); 
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieSelected + "&api_key=6Iou32kQlamjxUxsI9WiQYOVg3s60kou&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response); 
        var imageUrl = response.data[0].images.fixed_height.url; 

          // Creating and storing an image tag
          var movieImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          movieImage.attr("src", imageUrl);
          movieImage.attr("alt", "movie image");

          // Prepending the catImage to the images div
          $("#movies").prepend(movieImage);

    }); 
}; //movieInfo end

    $(document).on("click", ".movie", movieInfo);