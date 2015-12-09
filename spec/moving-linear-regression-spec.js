var MLR = require('../moving-linear-regression.js');

describe('MovingLinearRegression', function() {
	it('regresses to least squares', function() {
		var regression = new MLR([[1, 1], [2, 2], [3, 3]]);
		expect(regression.slope).toEqual(1);
		expect(regression.yIntercept).toEqual(1);
		
		var regression = new MLR([[1, 4], [2, 5], [3, 6]]);
		expect(regression.yIntercept).toEqual(4);
		expect(regression.slope).toEqual(1);

		var regression = new MLR([[1, 1], [2, 5], [3, 9]]);
		expect(regression.yIntercept).toEqual(1);
		expect(regression.slope).toEqual(4);
	});

	it('calculates proper y intercept', function() {
		var regression = new MLR([[1, 2], [3, 4], [5, 6]]);
		expect(regression.yIntercept).toEqual(2);

		var regression = new MLR([[1, 4], [4, 5]]);
		expect(regression.yIntercept).toEqual(4);
	});

	it('calculates a steeper slope', function() {
		var testData = [[1, 4], [2, 7], [3, 10]];
		var regression = new MLR(testData);
		expect(regression.slope).toEqual(3);
	});

	it('Calculates a complex linear regression', function() {
		var regression = new MLR([[1, 3], [4, 10], [20, 30], [25, 35], [50, 80]])
		expect(regression.slope).toEqual(1.5291828793774318);
		expect(regression.yIntercept).toEqual(2.545525291828797);
	});

	it('moves properly', function() {
		var regressionUnmoving = new MLR([[1, 3], [4, 10], [20, 30], [25, 35], [50, 80]]);
		var regressionMoving = new MLR([[0, 0], [1, 3], [4, 10], [20, 30], [25, 35]]);
		regressionMoving.push([50, 80]);
		expect(regressionMoving.slope).toEqual(regressionUnmoving.slope);
		expect(regressionMoving.yIntercept).toEqual(regressionUnmoving.yIntercept);
	});

	it('has sanity', function() {
		var regressionUnmoving = new MLR([[1, 3], [4, 10], [20, 30], [25, 35], [50, 80]]);
		var regressionMoving = new MLR([[0, 0], [1, 3], [4, 10], [20, 30], [25, 35]]);
		expect(regressionMoving.slope).not.toEqual(regressionUnmoving.slope);
		expect(regressionMoving.yIntercept).not.toEqual(regressionUnmoving.yIntercept);
	});
});
