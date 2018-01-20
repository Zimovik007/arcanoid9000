<!doctype html5>
<html>
<head>
    <meta charset="utf-8">
    <title>Арканоид9000</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container container-size" id="main_menu">
        <div class="row start-menu">
            <div class="col-lg-8 col-lg-offset-2">
                <div class="menu-wrapper">
                    <h2 class="menu_title">АРКАНОИД 9000</h2>
                    <div class="start-menu_player-name">
                        <input id="player_name" type="text" class="form-control" placeholder="Введите имя">
                    </div>
                    <div class="start-menu_button-start">
                        <button id="start_game_button" class="btn btn-primary">Начать игру!</button>
                    </div>
                    <div class="start-menu_button-results">
                        <button id="results_game_button" class="btn btn-info">Результаты</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container container-size" id="results_menu">
        <div class="row results-menu">
            <div class="col-lg-8 col-lg-offset-2">
                <div class="menu-wrapper">
                    <h2 class="menu_title">Результаты:</h2>
                    <div class="results-menu_results" id="results-menu_results"></div>
                    <div class="results-menu_button-home">
                        <button id="results-menu_button-to-home" class="btn btn-warning">на Главную</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    
    <div class="container container-size" id="game_menu">
        <div class="row game-menu">
            <div class="col-lg-12">
                <div class="menu-wrapper">
                    <h2 class="menu_title">АРКАНОИД 9000</h2>
                    <p id="player" class="game-menu_player"></p>
                    <p id="player_score" class="game-menu_player"></p>
                    <p id="player_life" class="game-menu_player"></p>
                    <p id="time_left" class="game-menu_player"></p>
                    <br>
                    <canvas id="game_field" width="900" height="600" class="game-menu_canvas"></canvas>
                    <div class="game-menu_game-over-state" id="game-menu_game-over-state">
                        <h3>Game over!!!</h3>
                        <p class="game-menu_p-game-over-score" id="game-menu_p-game-over-score"></p>
                        <p class="game-menu_p-game-over-score" id="game-menu_p-game-over-push"></p>
                        <div class="horizontal-form">
                            <button class="btn btn-warning" id="results-menu_button-to-home">на Главную</button>
                            <button class="btn btn-primary" id="results_game_button">Результаты</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/view_game.js"></script>
    <script src="js/view_main_menu.js"></script>
    <script src="js/view_results.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            $("#results_menu").hide();
            $("#game_menu").hide();
        });
    </script>
</body>
</html>