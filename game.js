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

    const BootState = {
        init : function () {
            game.stage.backgroundColor = '#5c94fc';
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        },
        create : function () {
            this.state.start("PreloadState");
        }
    };

    const PreloadState = {
        preload : function () {
            game.load.spritesheet('mario', 'assets/player.png', 18, 20);
            game.load.spritesheet('flag', 'assets/flag.png', 33, 168);
            game.load.image('cloud', 'assets/cloud.png');
            game.load.image('sun', 'assets/sun.png');
            game.load.image('tile', 'assets/tile.png');
            game.load.image('wave', 'assets/wave.png');
            game.load.image('sea', 'assets/sea.png');
        },

        const GameState = {
        init: function() {
            createGame();
        },
        update: function() {
            updateState();
        }
    };

game.state.add("BootState",BootState);
    game.state.add("PreloadState",PreloadState);
    game.state.add("GameState",GameState);
    game.state.start("BootState");

function createGame() {
        pos = 0;
        firstTime = true;
        onGround = true;
        platforms_array = [];
        game.world.setBounds(0,0,game_length);
        game.physics.startSystem(Phaser.Physics.ARCADE);

    for(let i=0;i<29;i++){
            platforms_array.push(Math.floor(Math.random()*3)+1);
        }

     clouds = game.add.group();
        let change = 15;
        for (let i = 70; i < game_length; i+= 240) {
            clouds.create(i, change + ground_height - 8*unit, 'cloud');
            change *= -1;
        }
    
     sun = game.add.sprite(16*unit, ground_height - 13.5*unit, 'sun');
        game.physics.arcade.enable(sun);

    platforms = game.add.group();
        platforms.enableBody = true;
        for (i = 0; i < 30; i++) {
            let pos = i * 60 + 15;
            let platform = platforms.create(pos, ground_height, 'tile');
            platform.body.immovable = true;
            game.add.text(pos + 10, ground_height-40, platforms_array[i], result_font);
            if(i===29){
                platform.scale.setTo(2,1);
            }
        }

    const ground = game.add.tileSprite(0,ground_height+10, game_length, 6, 'wave');
        game.physics.arcade.enable(ground);
        ground.body.immovable = true;
        game.add.tileSprite(0,ground_height+14, game_length, game.height, 'sea');
    
    flag = game.add.sprite(1780, ground_height-168, 'flag');
        flag.animations.add('celebrate');
