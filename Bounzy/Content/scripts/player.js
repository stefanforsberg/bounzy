var Bouncy = Bouncy || {};

(function () {
    var self;
    function player() {
        self = this;
        this.direction = 1;
        this.boosts = 5;
        this.hits = 0;
        this.rect = new Bouncy.Rectangle(55, 0, 15, 15);

        Bouncy.channel.subscribe("player.direction.change", this.directionChanged);
    }

    player.prototype.directionChanged = function (data) {
        if (self.boosts === 0) return;
        self.boosts--;
        
        setTimeout(function() {
            self.boosts++;
            Bouncy.channel.publish("player.boost.change", { newBoost: self.boosts });
        }, 3000);

        Bouncy.channel.publish("player.boost.change", { newBoost: self.boosts });

        self.direction = data.direction;
    };

    player.prototype.move = function() {
        this.rect.top += this.direction;

        if (this.rect.top + this.rect.height >= Bouncy.screen.height) {
            this.direction = -1;
        } else if (this.rect.top <= 0) {
            this.direction = 1;
        }
    };

    player.prototype.draw = function() {
        Bouncy.ctx.fillStyle = 'white';
        Bouncy.ctx.fillRect(this.rect.left - Bouncy.screen.offsetX, this.rect.top, this.rect.width, this.rect.height);
    };

    player.prototype.hit = function() {
        this.hits++;
        Bouncy.channel.publish("player.hits.change", { newHits: this.hits });
    };
    
    Bouncy.player = player;
})();