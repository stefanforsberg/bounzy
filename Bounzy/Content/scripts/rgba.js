var Bouncy = Bouncy || {};

(function () {
    function rgba(r, g, b, alpha) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
        this.rgbaString = this.toString();
    }

    rgba.prototype.setAlpha = function (alpha) {
        if (alpha < 0) alpha = 0;
        this.alpha = alpha;
        this.rgbaString = this.toString();
    };

    rgba.prototype.toString = function() {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
    };

    Bouncy.Rgba = rgba;
})();