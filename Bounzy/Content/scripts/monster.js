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
        this.collisionRect = new Bouncy.Rectangle(x, y, 8, 8);
        this.isExploding = false;
        this.shouldDraw = false;
        this.explodingDirection = 1;
    };
    
    Monster.prototype.draw = function () {

        if (this.isExploding) {
            this.explosion.draw();
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
        this.rect.left -= this.movementCoefficient;
    };
    
    Monster.prototype.upAndDown = function () {
        this.rect.top += 2 * Math.sin(Bouncy.screen.offsetX / 20 - 20 * this.movementCoefficient);
    };
    
    Monster.prototype.changingSize = function () {
        this.rect.width = this.rect.height = 8 + this.movementCoefficient * Math.abs(Math.sin(Bouncy.screen.offsetX / 20 + 4 * this.movementCoefficient));
    };

    Monster.prototype.collision = function () {
        
        this.explosion = new explosion(this.rect, this.color);
        this.isExploding = true;
    };

    var explosion = function(rect, color) {
        this.rect = rect;
        this.color = color;
        this.explodingDirection = 1;
        this.relativeX = 0;
        this.relativeY = 0;
        this.spin = Math.floor((Math.random() * 360) + 1);
        this.spinDirection = Math.floor((Math.random() * 10) - 5);
        this.size = this.rect.width / 2;
        this.debris = [
            { x: Math.floor((Math.random() * 10) + 1), y: -Math.floor((Math.random() * 8) + 1), dir: 1, centerLeft: rect.left, centerTop: rect.top },
            { x: Math.floor((Math.random() * 10) + 1), y: -Math.floor((Math.random() * 8) + 1), dir: .3, centerLeft: rect.left, centerTop: rect.top },
            { x: Math.floor((Math.random() * 10) + 1), y: -Math.floor((Math.random() * 8) + 1), dir: 0, centerLeft: rect.left, centerTop: rect.top },
            { x: Math.floor((Math.random() * 10) + 1), y: -Math.floor((Math.random() * 8) + 1), dir: -1, centerLeft: rect.left, centerTop: rect.top },
            { x: Math.floor((Math.random() * 10) + 1), y: -Math.floor((Math.random() * 8) + 1), dir: -.2, centerLeft: rect.left, centerTop: rect.top }
        ];
    };

    explosion.prototype.draw = function() {
        if (this.color.alpha > 0) {
            this.color.setAlpha(this.color.alpha -= .01);
        }

        Bouncy.ctx.fillStyle = this.color.rgbaString;

        this.drawDebris(0);
        this.drawDebris(1);
        this.drawDebris(2);
        this.drawDebris(3);
        this.drawDebris(4);
        
        this.spin += this.spinDirection;
    };
    
    explosion.prototype.drawDebris = function(i) {
        Bouncy.ctx.save();

        Bouncy.ctx.translate(this.debris[i].centerLeft + (this.size / 2), this.debris[i].centerTop + (this.size / 2));
        Bouncy.ctx.rotate(this.spin * Math.PI / 180);

        this.debris[i].x += this.debris[i].dir;
        this.debris[i].y += this.debris[i].dir;
        Bouncy.ctx.fillRect(this.debris[i].x - (this.size / 2), this.debris[i].y - (this.size / 2), this.size, this.size);
        this.debris[i].centerTop += this.debris[i].dir;
        this.debris[i].centerTop += this.debris[i].dir;
        
        Bouncy.ctx.restore();
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
            monster.movementCoefficient = (Math.random() * 1) + 0.1;
            monster.color = new Bouncy.Rgba(0, 153, 153, 0.9);
        },
        
        upAndDownMonster: function(monster) {
            monster.updateRect = monster.upAndDown;
            monster.movementCoefficient = Math.random();
            monster.color = new Bouncy.Rgba(255, 133, 0, 0.9);
        },
        
        changingSizeMonster: function(monster) {
            monster.updateRect = monster.changingSize;
            monster.movementCoefficient = Math.floor((Math.random() * 5) + 5);
            monster.color = new Bouncy.Rgba(217, 52, 133, 0.9);
        }
    };
    
    Bouncy.MonsterFactory = monsterFactory;
})();