const {getMean, getMedian, getMode} = require('./functions');


describe('test funtions to get mean, median, and mode of an array of numbers', function() {
    const nums = [4, 2, 4, 5, 6, 1];

    test('should get mean', () => {
        const mean = parseFloat(getMean(nums).toFixed(2))

        expect(mean).toBe(3.67);
    });

    test('should get median', () => {
        const median = getMedian(nums);

        expect(median).toBe(4);
    });

    test('should get mode', () => {
        const mode = getMode(nums);

        expect(mode).toBe(4);
    });
    
});