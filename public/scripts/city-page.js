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

    $("#city-container").on("click", "#deleteBlurbBtn", function() {
        $.ajax({
            method: "DELETE",
            url: "/api/cities/" + cityId + "/blurbs/" + $(this).attr('data'),
            success: deleteBlurbSucess,
            error: deleteBlurbError
        })
    })

    $("#city-container").on("click", "#likeBlurbBtn", function() {
        $.ajax({
            method: "PUT",
            url: "/api/cities/" + cityId + "/blurbs/" + $(this).attr('data'),
            success: likeBlurbSuccess,
            error: likeBlurbError
        })
        // $("#city-container").off("click", ".likeBlurbBtn");
    });
    $("#city-container").on("click", "#newBlurbBtn", function() {
        $('#blurbModal').modal();
    });

    $("#city-container").on("click", "#saveBlurb", function() {
      console.log('save was clicked');
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
        });
        // $("#city-container").off("click", ".likeBlurbBtn");
    });
});

function newBlurbSuccess(json){
  console.log("new blurb",json);
  var newBlurb ="<div class='blurb-box'><h4 class='posterName'>"+json.poster+"</h4><p class='blurbText'>"+json.textContent+"</p><button type='button' data='"+json._id +"id='deleteBlurbBtn' class='btn btn-primary' name='deleteBtn'>X</button><button type='button' data='"+json._id +"id='likeBlurbBtn' class='btn btn-primary' name='likeBtn'><span class='like'>"+json.likes +"</span><img class='hearticon' src='/images/hearticon.png' alt='like' title='like'>s</button>"; 
  $(".blurb-box").first().prepend(newBlurb);
}
function newBlurbError(){
  console.log('new error');
}

function likeBlurbError(){
  console.log("like blurb error");
}

function likeBlurbSuccess(blurb){
  // $('*[data='+blurb._id+']').siblings(".likes").html("Likes: "+blurb.likes);
  $('*[data='+blurb._id+']').siblings("#likeBlurbBtn").html(blurb.likes+ ' <img class="hearticon" src="/images/hearticon.png" alt="like" title="like">'+'s');
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
