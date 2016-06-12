var chai = require('chai');
var arrayCop = require('../src/array-cop');
var assert = chai.assert;
var expect = chai.expect;

var arr = [1, 3, [3, [5, ]], 7, 8, 'pete', {}];

describe('flatten', function() {
    it('should return a flattened array', function() {
        assert.deepEqual(arrayCop.flatten(arr), [1, 3, 3, 5, 7, 8, 'pete', {}]);
        assert.deepEqual(arrayCop.flatten(["alice"]), ["alice"]);
        assert.deepEqual(arrayCop.flatten(), undefined);
    });
    it('should return an object back', function() {
        assert.deepEqual(arrayCop.flatten("not an array"), "not an array");
    });
});

var srcArray = [1, 3, 3, 'Some string', 'Some string', 5, 7, 8, 'pete', {}];
describe('dedup', function() {
    it('should removes duplicates from an array', function() {
        assert.deepEqual(arrayCop.dedup(srcArray), [1, 3, 'Some string', 5, 7, 8, 'pete', {}]);
    });
});

describe('rand', function() {
    it('should return 2nd element', function() {
        assert.deepEqual(arrayCop.rand(srcArray, 1, 2), 3);
    });
});

describe('sum', function() {
    it('should return sum of all element with type number', function() {
        assert.deepEqual(arrayCop.sum(srcArray), 27);
        assert.deepEqual(arrayCop.sum([2, 3, [5, 7, undefined], 'String']), 17);
    });
    it('should return 0 for empty array', function() {
        assert.deepEqual(arrayCop.sum([]), 0);
    });
    it('should return 0 for array without numbers', function() {
        assert.deepEqual(arrayCop.sum(['String', {
            objKey: 'objVal'
        }, undefined]), 0);
    });
});

describe('cop', function() {
    it('should throw an error if argument is not an array', function() {
        expect(function() {
            arrayCop.cop(0)
        }).to.throw('Not an array!');
    });
    it('should get of all the empty items while preserving the structure', function() {
        assert.deepEqual(arrayCop.cop([1, 2, , , , , 3, 4, [5, , , , , ], 6, , , , 8, 3, [
            [
                [], 9
            ]
        ]]), [1, 2, 3, 4, [5], 6, 8, 3, [
            [
                [], 9
            ]
        ]]);
    });
    it('should get of all the empty items while preserving the structure', function() {
        assert.deepEqual(arrayCop.cop([1,2,,,,,3,4,[5,,,,,],6,,,,8,3,[[[],9]]], true), [ 1, 2, 3, 4, 5, 6, 8, 3, 9 ]);
    });
})
