$("body").on("click", "#results-menu_button-to-home", function(){
    $("#results_menu").hide();
    $("#game_menu").hide();
    $("#main_menu").show();
    $("body").css("background-image", "url(bg1.jpg)");
});