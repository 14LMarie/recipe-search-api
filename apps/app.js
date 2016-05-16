$(document).ready(function () {

    var getRecipe = function (keyword, cuisine) {

        var result = $.ajax({
                url: "http://api.yummly.com/v1/api/recipes?_app_id=6d9e22ab&_app_key=e4270a20949b90bf9cca1017d935f12b&q=" + keyword + "&allowedCuisine[]=cuisine^cuisine-" + cuisine + "&requirePictures=true",
                dataType: "jsonp",
                type: "GET"
            })
            .done(function (result) {
                var html = "";
                $.each(result.matches, function (index, value) {
                    html += '<ul class="recipe-wrapper"><div class="recipe-result"><li><img src="' + value.imageUrlsBySize[90] + '"><ul><li class="recipeTitle"><a target="_blank" href=https://www.yummly.com/recipe/' + value.id + ' >' + value.recipeName + '</a></li><li> Cooking time: ' + (value.totalTimeInSeconds / 60) + " min" + '</li><li> Rating: ' + value.rating + " stars" + '</li></ul></li></div></ul>';
                });
                $('#search-results').html(html);
            })

        .fail(function (jqXHR, error, errorThrown) {
            var errorElem = showError(error);
            $('#search-results').append(errorElem);
        });
    }

    //hide form and show results after click on submit
    $('#search-button').click(function () {
        var ingredients = $('#ingredients-input').val();
        var cuisine = $('#cuisine-dropdown').val();
        if ((ingredients == "") || (cuisine == null)) {
            alert("Please provide ingredients and select a cuisine!");
        } else {
            getRecipe(ingredients, cuisine);
            console.log(ingredients);
            console.log(cuisine);
            $('#search-input').hide();
            $('#search-results').show();
            $('#search-again').show();
        }
    });

    //hide results, show form after click on search again
    $('#search-again').click(function () {
        $('#search-results').hide();
        $('#search-again').hide();
        $('#search-input').show();
        $('#ingredients-input').val("");
        $('#cuisine-dropdown').val("choose");
    });

});
