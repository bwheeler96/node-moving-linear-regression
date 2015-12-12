#!/usr/bin/env node
var _ = require('underscore');

var MovingLinearRegression = function (data, options) {
    this.data = [];
    this.options = options || {};
    this.sumX = 0;
    this.sumY = 0;
    this.sumXY = 0;
    this.sumXX = 0;
    var self = this;
    _.each(data, function (point) {
        self.addPoint(point);
    });
    this.calculate();
    return this;
};

MovingLinearRegression.prototype.predict = function (value) {
    return this.slope * value + this.yIntercept;
};

MovingLinearRegression.prototype.push = function (point) {
    this.prune();
    this.addPoint(point);
    this.calculate();
    return this;
};

MovingLinearRegression.prototype.prune = function () {
    var removePoints = [];
    while (this.options.shouldDropPoint && this.data.length > 0)
        if (this.options.shouldDropPoint(this.data[0])) {
            removePoints.push(this.data.shift());
        } else break;
    var self = this;
    console.log("Remove points", removePoints);
    _.each(removePoints, function(point) {
        self.dropPoint(point);
    });
};

MovingLinearRegression.prototype.dropPoint = function (point) {
    var x = point[0];
    var y = point[1];
    console.log("Dropping", x, y);
    this.sumX -= x;
    this.sumY -= y;
    this.sumXY -= x * y;
    this.sumXX -= x * x;
};

MovingLinearRegression.prototype.addPoint = function (point) {
    this.data.push(point);
    this.length = this.data.length;
    this.center = this.data[0][0];
    var x = point[0];
    var y = point[1];
    this.sumX += x;
    this.sumY += y;
    this.sumXY += x * y;
    this.sumXX += x * x;
};

MovingLinearRegression.prototype.calculate = function () {
    console.log("Calculating with: ", this.data);
    this.slope = (this.sumXY * this.length - this.sumX * this.sumY) / (this.length * this.sumXX - this.sumX * this.sumX);
    this.yIntercept = (this.sumY / this.length) - (this.slope * this.sumX ) / this.length + (this.center * this.slope);
    console.log("Calculated: y = ", this.slope, "x +", this.yIntercept);
    console.log(this.sumX, this.sumY, this.sumXX, this.sumXY);
};


module.exports = MovingLinearRegression;