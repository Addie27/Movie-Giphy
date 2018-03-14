var topics = ["moana", "boss baby", "toy story", "my little pony", "finding nemo", "shrek", "wreck-it ralph", "zootopia"];
var movieImage;
var movieVideo; 

function createButtons() {
    $("#movies-populate").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("movie");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#movies-populate").append(button);
    }

};//createButtons end

createButtons();

function movieInfo() {
    var movieSelected = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieSelected + "&api_key=6Iou32kQlamjxUxsI9WiQYOVg3s60kou&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");

            var movieImage = $("<img class='gif' data-state='still'>");

            var image = results[i].images.fixed_height_still.url, src;
            var movie = results[i].images.fixed_height.url; 

            movieImage.attr({
                    "src": image,
                    "data-animate": movie,
                    "data-still": image});

            gifDiv.append(movieImage);

            $("#movies").prepend(gifDiv);

            $(".gif").on("click", function (){
                var state = $(this).attr("data-state");
        
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } 
                else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            
            });//click image close

        };//for loop close
    });//ajax call end
}; //movieInfo end

$(document).on("click", ".movie", movieInfo);

$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var newMovie = $("#movie-input").val().trim();
    topics.push(newMovie);


    createButtons();
  });//add movie click close