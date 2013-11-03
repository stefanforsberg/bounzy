var Bouncy = Bouncy || {};

(function () {
    function Monster() {
        this.updateRect = {};
        this.revive();
    }

    Monster.prototype.revive = function () {
        var x = (Math.random() * Bouncy.screen.width) - Bouncy.screen.offsetX + Bouncy.screen.width;
        var y = (Math.random() * Bouncy.screen.height) + 1;
        this.rect = new Bouncy.Rectangle(x, y, 8, 8);
        this.speed = (Math.random() * 1) + 0.1;
        this.collisionRect = new Bouncy.Rectangle(x, y, 8, 8);
        this.isExploding = false;
        this.shouldDraw = false;
        this.explodingDirection = 1;
    };
    
    Monster.prototype.draw = function () {

        if (this.isExploding) {
            
            if (this.color.alpha > 0) {
                this.color.setAlpha(this.color.alpha -= .02);
            }
            
            if (this.color.alpha === 0) {
                this.revive();
            }

            Bouncy.ctx.fillStyle = this.color.rgbaString;
            Bouncy.ctx.fillRect(this.rect.left, this.rect.top += this.explodingDirection, this.rect.width / 2, this.rect.height / 2);
            Bouncy.ctx.fillRect(this.rect.left + 8, this.rect.top += this.explodingDirection, this.rect.width / 2, this.rect.height / 2);
        } else {
            Bouncy.ctx.fillStyle = this.color.rgbaString;
            Bouncy.ctx.fillRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);

            this.updateRect();

            if (Math.abs(Bouncy.screen.offsetX) > (this.rect.left + this.rect.width)) {
                this.rect.left = -Bouncy.screen.offsetX + Bouncy.screen.width;
            }

            this.collisionRect.top = this.rect.top;
            this.collisionRect.left = Bouncy.screen.offsetX + this.rect.left;
        }

        
    };

    Monster.prototype.setSpeed = function () {
        this.rect.left -= this.speed;
    };
    
    Monster.prototype.upAndDown = function () {
        this.rect.top += 2 * Math.sin(Bouncy.screen.offsetX / 20);
    };
    
    Monster.prototype.changingSize = function () {
        this.rect.width = this.rect.height = 8 +8*Math.abs(Math.sin(Bouncy.screen.offsetX / 20));
    };

    Monster.prototype.collision = function () {
        
        if (Bouncy.player.rect.top > this.collisionRect.top) {
            this.explodingDirection = -1;
        }

        this.isExploding = true;
    };


    var monsterFactory = {
        createMonster: function () {
            var m = new Monster();

            var randomType = Math.floor((Math.random() * 3) + 1);

            switch (randomType) {
                case 1:
                    this.speedMonster(m);
                    return m;
                case 2:
                    this.upAndDownMonster(m);
                    return m;
                default:
                    this.changingSizeMonster(m);
                    return m;
            }
        },
        
        speedMonster: function(monster) {
            monster.updateRect = monster.setSpeed;
            monster.color = new Bouncy.Rgba(0, 153, 153, 0.9);
        },
        
        upAndDownMonster: function(monster) {
            monster.updateRect = monster.upAndDown;
            monster.color = new Bouncy.Rgba(255, 133, 0, 0.9);
        },
        
        changingSizeMonster: function(monster) {
            monster.updateRect = monster.changingSize;
            monster.color = new Bouncy.Rgba(217, 52, 133, 0.9);
        }
    };
    
    Bouncy.MonsterFactory = monsterFactory;
})();