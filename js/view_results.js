$("body").on("click", "#results_game_button", function(){
    $("#main_menu").hide();
    $("#game_menu").hide();
    $("#results_menu").show();
    $("body").css("background-image", "url(bg2.jpg)");
    
    $.ajax({
        type: "POST",
        url: "get_results.php",
        success:function(response){
            $("#results-menu_results").empty();
            $("#results-menu_results").append(response);
        },
    });
});