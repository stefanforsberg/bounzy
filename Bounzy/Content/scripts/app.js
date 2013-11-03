var Bouncy = Bouncy || {};

Bouncy.channel = postal.channel();

Bouncy.init = function () {
    var can = document.getElementById('canvas1');

    Bouncy.channel.subscribe("player.boost.change", function (data) {
        document.getElementById('boosts').innerHTML = data.newBoost;
    });

    Bouncy.channel.subscribe("player.hits.change", function (data) {
        document.getElementById('player-hits').innerHTML = data.newHits;
    });

    Bouncy.channel.subscribe("monster.added", function (data) {
        document.getElementById('monsters').innerHTML = data.count;
    });

    document.addEventListener('keydown', function (e) {

        if (e.keyCode === 38) {
            Bouncy.channel.publish("player.direction.change", { direction: -1 });
        } else if (e.keyCode === 40) {
            Bouncy.channel.publish("player.direction.change", { direction: 1 });
        }
    }, false);

    this.ctx = can.getContext('2d');
    this.monsters = [];

    var monsterSpawnerInteral = setInterval(function () {
        Bouncy.monsters.push(Bouncy.MonsterFactory.createMonster());
        Bouncy.channel.publish("monster.added", { count: Bouncy.monsters.length });
        
        if (Bouncy.monsters.length >= 50) {
            window.clearInterval(monsterSpawnerInteral);
        }

    }, 10);

    Bouncy.player = new Bouncy.player();



    Bouncy.gameLoop();
};

Bouncy.screen = {
    width: 800,
    height: 400,
    offsetX:  0,
    offsetY:  0
};

Bouncy.gameLoop = function () {

    Bouncy.ctx.save();
    Bouncy.ctx.translate(Bouncy.screen.offsetX, Bouncy.screen.offsetY);

    Bouncy.ctx.clearRect(-Bouncy.screen.offsetX, -Bouncy.screen.offsetY, Bouncy.screen.width, Bouncy.screen.height);

    
    Bouncy.player.draw();

    for (var i = 0; i < Bouncy.monsters.length; i++) {
        
        if (Bouncy.player.rect.collides(Bouncy.monsters[i].collisionRect)) {
            if (!Bouncy.monsters[i].isExploding) {
                Bouncy.monsters[i].collision();
                Bouncy.player.hit();
            }
            
            //Bouncy.monsters.splice(i, 1);
        } else {
            
        }
        
        Bouncy.monsters[i].draw();

        
    }

    

    Bouncy.player.move();

    

    Bouncy.screen.offsetX--;

    Bouncy.ctx.restore();

    document.getElementById('canvas1').style.backgroundPosition = (Bouncy.screen.offsetX/5) + "px 0";

    window.webkitRequestAnimationFrame(Bouncy.gameLoop);
};


(function () {
    Bouncy.init();
}());