console.log("Sanity Check: JS is working!");
var template;
var $cityList;
var allCities = [];

$(document).ready(function() {
    $cityList = $('#city-container');
    var url = window.location.href;
    var cityId = url.match(/cities\/(.*)/)[1];

    // compile handlebars template
    var source = $('#city-template').html();
    template = Handlebars.compile(source);

    $.ajax({
        method: 'GET',
        url: '/api/cities/' + cityId,
        success: handleSuccess,
        error: handleError
    });

    $("#city-container").on("click", ".deleteBlurbBtn", function() {
        $.ajax({
            method: "DELETE",
            url: "/api/cities/" + cityId + "/blurbs/" + $(this).attr('data'),
            success: deleteBlurbSucess,
            error: deleteBlurbError
        })
    })

    $("#city-container").on("click", ".likeBlurbBtn", function() {
      likes = $(this).siblings(".likes").html();
      $(this).siblings(".likes").html(+likes+1);

        $.ajax({
            method: "PUT",
            url: "/api/cities/" + cityId + "/blurbs/" + $(this).attr('data'),
            success: likeBlurbSuccess,
            error: likeBlurbError
        })
        $("#city-container").off("click", ".likeBlurbBtn");
    });

    $("#city-container").on("click", ".newBlurbBtn", function() {
        $('#blurbModal').modal();
    });

    $("#city-container").on("click", "#saveBlurb", function() {
      console.log('save ws clicked');
      var blurber = $("#blurberName").val();
      var blurbText = $("#blurbText").val();

        $('#blurbModal').modal('toggle');
        console.log(cityId);

        $.ajax({
            method: "POST",
            url: "/api/cities/" + cityId + "/blurbs/",
            data: {poster: blurber, textContent: blurbText},
            success: newBlurbSuccess,
            error: newBlurbError
        })
        $("#city-container").off("click", ".likeBlurbBtn");
    });


});


function newBlurbSuccess(json){
  console.log("new blurb",json);
  var newBlurb ="<div class='blurb-box'><h4 class='posterName'>"+json.poster+"</h4><p class='blurbText'>"+json.textContent+"</p><h5 class='likes'>"+json.likes+"</h5><button type='button' data='"+json._id +"class+'='deleteBlurbBtn' name='deleteBtn'>X</button><button type='button' data='"+json._id+ "class='likeBlurbBtn' name='likeBtn'>+1</button></div>";

  $(".blurb-box").first().prepend(newBlurb);

}
function newBlurbError(){
  console.log('new error');
}

function likeBlurbError(){
  console.log("like blurb error");
}

function likeBlurbSuccess(id){
  console.log(id);
}


function deleteBlurbError(){
  console.log('delete blurb error');
}

function deleteBlurbSucess(id){
  $('*[data='+id+']').closest(".blurb-box").hide();
}
// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {
    // empty existing posts from view
    $cityList.empty();

    // pass `allCities` into the template function
    var cityHtml = template({
        city: allCities
    });

    // append html to the view
    $cityList.append(cityHtml);
};

function handleSuccess(json) {
    allCities = json;
    render();
}

function handleError(e) {
    console.log('uh oh');
    $('#city-container').text('Failed to load citys, check server');
}
