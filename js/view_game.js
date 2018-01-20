$("#start_game_button").click(function(){
    $("#main_menu").hide();
    $("#game_menu").show();
    $("#game-menu_game-over-state").hide();
    
    $("#game_field").show();
    
    var player_name = $("#player_name").val();
    if (player_name.length == 0){
        player_name = "default_player";
    }
    console.log(player_name);
    
    var cnt_ticks = 0;
    var player_score = 0;
    var player_life = 0;
    var times = 60;
    
    $("#player").empty();
    $("#player_score").empty();
    $("#player_life").empty();
    $("#time_left").empty();
    $("#player").text("Игрок: " + player_name);
    $("#player_score").text("Счет: " + player_score);
    $("#player_life").text("Жизни: " + player_life);
    $("#time_left").text("Осталось секунд: 00:" + times);
    
    var canvas = document.getElementById("game_field");
    var cgc = canvas.getContext("2d"); 
    
    var x_ball = 450;
    var y_ball = 500;
    var dx = -2;
    var dy = 2;
    var ball_radius = 10;
    
    function game_over(){
        clearInterval(inter);
        $("#game_field").hide();
        $("#player").empty();
        $("#player_score").empty();
        $("#player_life").empty();
        $("#time_left").empty();
        $("#game-menu_game-over-state").show();
        $("#game-menu_p-game-over-score").empty();
        $("#game-menu_p-game-over-score").text("Ваш счет: " + player_score);
        
        var str_result = "score=" + player_score + "&name=" + player_name;
        
        $.ajax({
            type: "POST",
            url: "add_result.php",
            dataType: "text",
            data: str_result,
            success: function(response){
                $("#game-menu_p-game-over-push").empty();
                $("#game-menu_p-game-over-push").text(response);
            }
        });
    }
    
    function draw_ball(){
        cgc.beginPath();
        cgc.arc(x_ball, y_ball, 20, 0, Math.PI*2, false);
        cgc.fillStyle = "green";
        cgc.fill();
        cgc.closePath();
    }
    
    var width_paddle = 150;
    var height_paddle = 20;
    var x_paddle = (canvas.width - width_paddle) / 2;
    
    function draw_paddle(){
        if (right_is_pressed){
            if (x_paddle + 7 < canvas.width){
                x_paddle += 7;
            }
        }
        else if (left_is_pressed){
            if (x_paddle - 7 > 0){
                x_paddle -= 7;
            }
        }
        cgc.beginPath();
        cgc.rect(x_paddle - width_paddle / 2, 580, width_paddle, height_paddle);
        cgc.strokeStyle = "rgba(0, 0, 255, 0.5)";
        cgc.stroke();
        cgc.closePath(); 
    }
    
    var right_is_pressed = false;
    var left_is_pressed = false;
    
    document.addEventListener("keydown", key_down_handler, false);
    document.addEventListener("keyup", key_up_handler, false);
    
    function key_down_handler(e){
        if (e.keyCode == 39){
            right_is_pressed = true;
        }
        else if (e.keyCode == 37){
            left_is_pressed = true;
        }
    }
    
    function key_up_handler(e){
        if (e.keyCode == 39){
            right_is_pressed = false;
        }
        else if (e.keyCode == 37){
            left_is_pressed = false;
        }
    }
    
    function change_player_life(){
        times = -1;
        player_life -= 1;
        if (player_life < 0){
            game_over();
            return;
        }
        $("#player_life").empty();
        $("#player_life").text("Жизни: " + player_life);
    }
    
    function change_player_score(){
        player_score += 10;
        $("#player_score").empty();
        $("#player_score").text("Счет: " + player_score);
    }
    
    var width_brick = 50;
    var height_brick = 50;
    var offset_left_brick = 30;
    var offset_top_brick = 40;
    var padding_brick = 10;
    var row_count = 4;
    var col_count = 14;
    
    bricks = [];
    for (var i = 0; i < row_count; i++){
        bricks[i] = []
        for (var j = 0; j < col_count; j++){
            bricks[i][j] = {x: 0, y: 0, status: 0};
        }
    }
 
    function draw_bricks(){
        for (var i = 0; i < row_count; i++){
            for (var j = 0; j < col_count; j++){
                if (!bricks[i][j].status){
                    var x_brick = offset_left_brick + (j * (width_brick + padding_brick));
                    var y_brick = offset_top_brick + (i * (height_brick + padding_brick));
                    bricks[i][j].x = x_brick;
                    bricks[i][j].y = y_brick;
                    cgc.beginPath();
                    cgc.rect(x_brick, y_brick, width_brick, height_brick);
                    cgc.fillStyle = "#aa00cc";
                    cgc.fill();
                    cgc.closePath();
                }
            }
        } 
    }
    
    function detect_collusion(){
        for (var i = 0; i < row_count; i++){
            for (var j = 0; j < col_count; j++){
                if (bricks[i][j].status) continue;
                if (x_ball >= bricks[i][j].x - ball_radius && x_ball <= bricks[i][j].x + width_brick + ball_radius && y_ball >= bricks[i][j].y - ball_radius && y_ball <= bricks[i][j].y + height_brick + ball_radius){
                    bricks[i][j].status = 1;
                    if (x_ball <= bricks[i][j].x || x_ball >= bricks[i][j].x + width_brick){
                        dx = -dx;
                    }
                    else{
                        dy = -dy;
                    }
                    change_player_score();
                    return;
                }
            }
        }
    }
    
    function change_time_left(){
        times -= 1;
        if (times < 0){
            game_over();
            return;
        }
        $("#time_left").empty();
        $("#time_left").text("Осталось секунд: " + times);
    }
    
    function draw(){
        cnt_ticks += 1;
        if (cnt_ticks % 100 == 0){
            change_time_left();
        }
        if (player_life < 0) return;
        cgc.clearRect(0, 0, canvas.width, canvas.height);
        draw_ball();
        draw_paddle();
        detect_collusion();
        draw_bricks();
        if (y_ball + dy > canvas.height - ball_radius){
            if (!(x_ball > x_paddle - width_paddle / 2 && x_ball < x_paddle + width_paddle / 2)){
                change_player_life();
                y_ball -= ball_radius;
            }
            dx = -4 * (x_paddle - x_ball) / width_paddle; 
            dy = -4 + Math.abs(dx);
        } 
        if (y_ball + dy - ball_radius < 0){
            dy = -dy;
        }
        if (x_ball + dx - ball_radius < 0 || x_ball + dx > canvas.width - ball_radius){
            dx = -dx;
        }
        x_ball += dx;
        y_ball += dy;
    }
    var inter = setInterval(draw, 10);
});