import { fastAbs, fastFloor, fastPow, fastSqrt } from "./fastMaths.js";

export const EXPANDER = fastPow(2, 24);

/**
 * @name getVariance
 * @description Calculates the variance of a dataset
 * @param {Array<number>} data - An array of numbers
 * @returns {number} The variance of the dataset
 */
export function getVariance(data) {
    let count = 0;
    let sum = 0.0;
    let variance = 0.0;
    let average;

    data.forEach(number => {
        sum += number;
        ++count;
    });

    average = sum / count;

    data.forEach(number => {
        variance += fastPow(number - average, 2.0);
    });

    return variance;
}

/**
 * @name getStandardDeviation
 * @description Calculates the standard deviation of a dataset
 * @param {Array<number>} data - An array of numbers
 * @returns {number} The standard deviation of the dataset
 */
export function getStandardDeviation(data) {
    const variance = getVariance(data);
    return fastSqrt(variance);
}

/**
 * @name isScientificNotation
 * @description Checks if a number is in scientific notation
 * @param {number} num - Number to check
 * @returns {boolean} True if the number is in scientific notation, False otherwise
 */
export function isScientificNotation(num) {
    return num.toString().includes("E");
}

/**
 * @name mathOnGround
 * @description Checks if a y position is on the ground block in terms of Minecraft's block system
 * @param {number} posY - Y position to check
 * @returns {boolean} True if the posY is on the ground block, False otherwise
 */
export function mathOnGround(posY) {
    return posY % 0.015625 === 0;
}


/**
 * @name getOutliers
 * @description Identifies outliers in a dataset based on the interquartile range (IQR) method.
 * @param {Iterable<number>} collection - A collection of numbers to analyze.
 * @param {number} [amt=1.5] - The multiplier for the IQR to determine the threshold for outliers.
 * @returns {Object} An object containing two arrays: 'lower' for values below the lower threshold and 'upper' for values above the upper threshold.
 */
export function getOutliers(collection, amt=1.5) {
    const values = Array.from(collection);
    const half = fastFloor(values.length / 2);
    const q1 = getMedian(values.slice(0, half));
    const q3 = getMedian(values.slice(half, values.length));
    const iqr = fastAbs(q1 - q3);
    const lowThreshold = q1 - amt * iqr;
    const highThreshold = q3 + amt * iqr;
    const outliers = {
        lower: [],
        upper: []
    };

    values.forEach(value => {
        if (value < lowThreshold) {
            outliers.lower.push(value);
        } else if (value > highThreshold) {
            outliers.upper.push(value);
        }
    });

    return outliers;
}

/**
 * @name getOutliersInt
 * @description Returns the total number of outliers found in the given dataset using the interquartile range (IQR) method.
 * @param {Iterable<number>} collection - A collection of numbers to analyze.
 * @param {number} [amt=1.5] - The multiplier for the IQR to determine the threshold for outliers.
 * @returns {number} The total count of outliers in the dataset.
 */
export function getOutliersInt(collection, amt=1.5) {
    const data = getOutliers(collection, amt);
    // Return amount of outliers
    return data.lower.length + data.upper.length;
}

/**
 * @name getSkewness
 * @description Calculates the skewness of a dataset. Skewness is a measure of how symmetrical the data is.
 * @param {Iterable<number>} data - A collection of numbers to analyze.
 * @returns {number} The calculated skewness of the dataset.
 */
export function getSkewness(data) {
    const n = data.length;
    if (n === 0) return 0;

    let sum = 0, sumSquared = 0;

    for (let i = 0; i < n; i++) {
        const value = data[i];
        sum += value;
        sumSquared += value * value;
    }

    const mean = sum / n;
    const variance = (sumSquared / n) - (mean * mean);
    
    // Calculate median
    const sortedData = [...data].sort((a, b) => a - b);
    const median = n % 2 === 0 
        ? (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2 
        : sortedData[fastFloor(n / 2)];

    return 3 * (mean - median) / fastSqrt(variance);
}

/**
 * @name getAverage
 * @description Calculates the arithmetic mean of a dataset.
 * @param {Iterable<number>} data - A collection of numbers to calculate the mean for.
 * @returns {number} The average of the dataset.
 */
export function getAverage(data) {
    return data.reduce((acc, val) => acc + val, 0) / data.length;
}

/**
 * @name getKurtosis
 * @description Calculates the kurtosis of a dataset. Kurtosis is a measure of the "tailedness" of the probability distribution of a real-valued random variable.
 * @param {Array<number>} data - An array of numbers representing the dataset.
 * @returns {number} The kurtosis of the dataset. Returns 0 if the dataset has fewer than 3 elements.
 */
export function getKurtosis(data) {
    let sum = 0.0;
    let count = 0;

    data.forEach(number => {
        sum += number;
        ++count;
    });

    if (count < 3) {
        return 0.0;
    }

    const efficiencyFirst = count * (count + 1) / ((count - 1) * (count - 2) * (count - 3));
    const efficiencySecond = 3 * fastPow(count - 1, 2) / ((count - 2) * (count - 3));
    const average = sum / count;

    let variance = 0.0;
    let varianceSquared = 0.0;

    data.forEach(number => {
        variance += fastPow(average - number, 2.0);
        varianceSquared += fastPow(average - number, 4.0);
    });

    return efficiencyFirst * (varianceSquared / fastPow(variance / sum, 2.0)) - efficiencySecond;
}

/**
 * Calculates the median value of an array of numbers.
 *
 * @param {number[]} values - The array of numbers to calculate the median for.
 * @return {number} The median value of the input array.
 */
export function getMedian(values) {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const middleIndex = fastFloor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
        return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    } else {
        return sortedValues[middleIndex];
    }
}

/**
 * Converts an array to a list.
 *
 * @param {any[]} arr - The array to convert to a list.
 * @return {any[]} The list created from the array.
 */
export function arrayToList(arr) {
    const list = []
    
    for (const item of arr) {
      list.push(item);
    }
    
    return list;
}

/**
 * Calculates the average difference between consecutive elements in an array.
 *
 * @param {number[]} arr - The array of numbers to calculate the average difference for.
 * @return {number} The average difference between consecutive elements in the array.
 */
export function getAverageDifference(arr) {
    let sum = 0;
    for (let i = 1; i < arr.length; i++) {
        sum += arr[i] - arr[i - 1];
    }
    return sum / (arr.length - 1);
}

/**
 * Calculates the differences between consecutive elements in an array.
 *
 * @param {number[]} values - The array of numbers to calculate differences for.
 * @return {number[]} An array containing the differences between consecutive elements.
 */
export function getListDifferences(values) {
    return values.slice(0, -1).map((value, index) => value - values[index + 1]);
}

/**
 * Counts the number of rounded values in an array.
 *
 * @param {number[]} arr - The array to count rounded values in.
 * @return {number} The number of rounded values in the array.
 */
export function countRoundedValues(arr) {
    let flatCount = 0;

    arr.forEach(num => {
        // Check if the number is an integer (flat/round value)
        if (Number.isInteger(num)) {
            flatCount++;
        }
    });

    return flatCount;
}