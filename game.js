onload = function () {
    const unit = 16;
    const move_step = unit * 5;
    const fly_step = unit * 8;
    let platforms_array = [];
    let moves = [];
    let pos = 0;
    let firstTime = true;
    let onGround = true;
    const game = new Phaser.Game(320, 240, Phaser.AUTO, 'mynetwork');
    const game_length = 1850;
    const game_height = game.height;
    const ground_height = game_height - 2*unit;
    const result_font = { font:"20px",fill:"#000",align:"center"};
    const refresh = document.getElementById('generate-problem');
    refresh.onclick = function () {
        game.state.start("GameState");
    };
    
    var temptext = document.getElementById('temptext');
    var solve = document.getElementById('solve');
    const text = 'You\'ll receive a jumps array as input. Each index stores the maximum islands you can jump ahead from current island. ' +
        'You need to find least number of moves needed to reach the last island and return jump to be taken on each island.<br>' +
        'Can you solve it ?<br>';
    const text2 = 'Click on solve to get solution';
