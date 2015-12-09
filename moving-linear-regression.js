#!/usr/bin/env node
var _ = require('underscore');

var MovingLinearRegression = function(data) {
	this.data = data;
	this.sumX = 0;
	this.sumY = 0;
	this.sumXY = 0;
	this.sumXX = 0;
	this.independents = [];
	this.dependents = [];
	this.length = data.length;
	this.center = data[0][0];
	var self = this;
	_.each(data, function(point) {
		self.addPoint(point);
	});
	this.calculate();
	return this;
}

MovingLinearRegression.prototype.push = function(point) {
	var removePoint = this.data.shift();
	this.center = this.data[0][0];
	var x = removePoint[0];
	var y = removePoint[1];
	this.sumX -= x;
	this.sumY -= y;
	this.sumXY -= y * y;
	this.sumXX -= x * x;
	this.data.push(point);
	this.addPoint(point);
	this.calculate();
};

MovingLinearRegression.prototype.addPoint = function(point) {
	var x = point[0];
	var y = point[1];
	this.sumX += x;
	this.sumY += y;
	this.sumXY += x * y;
	this.sumXX += x * x;
	this.independents.push(x);
	this.dependents.push(y);
};

MovingLinearRegression.prototype.calculate = function() {
	this.slope = (this.sumXY * this.length - this.sumX * this.sumY) / (this.length * this.sumXX - this.sumX * this.sumX);
	this.yIntercept = (this.sumY / this.length) - (this.slope * this.sumX ) / this.length + (this.center * this.slope);
};


function sum(a, b) {
	return a + b;
}

function sumProduct(a, b) {
	return a[0] * a[1] + b[0] * b[1];
}

module.exports = MovingLinearRegression;
