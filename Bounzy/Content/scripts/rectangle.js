var Bouncy = Bouncy || {};

(function () {
    function Rectangle(left, top, width, height) {
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    Rectangle.prototype.collides = function (r) {
        return !(
            ((this.top + this.height) < (r.top)) ||
                (this.top > (r.top + r.height)) ||
                ((this.left + this.width) < r.left) ||
                (this.left > (r.left + r.width))
        );
    };

    Bouncy.Rectangle = Rectangle;
})();