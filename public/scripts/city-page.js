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

        // $.ajax({
        //     method: "PUT",
        //     url: "/api/cities/" + cityId + "/blurbs/" + $(this).attr('data'),
        //     success: likeBlurbSucess,
        //     error: likeBlurbError
        // })
    });

});


function likeBlurbSuccess(likes){

  console.log(likes);
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
