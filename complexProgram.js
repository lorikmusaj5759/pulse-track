/** 
 * filename: complexProgram.js
 * 
 * This code demonstrates a complex program that transforms and analyses data.
 * It generates a random dataset, applies various sorting and filtering techniques,
 * and performs statistical analysis on the results using mathematical formulas.
 * 
 * The generated dataset consists of objects with properties like id, name, age, and score.
 * The program then performs operations like sorting the dataset, filtering based on specific
 * criteria, and calculating statistics such as average, median, and standard deviation.
 *
 * The code is modularized into different functions for better organization,
 * and uses modern JavaScript features like arrow functions, spread operator, etc.
 */

// Generate a random dataset of individuals with properties like id, name, age, and score
const dataset = generateRandomDataset(1000);

// Sort the dataset by name in ascending order
const sortedByName = sortByProperty(dataset, 'name', 'asc');

// Filter the dataset to include only individuals with an age between 20 and 30
const filteredByAge = filterByRange(dataset, 'age', 20, 30);

// Sort the filtered dataset by score in descending order
const sortedByScore = sortByProperty(filteredByAge, 'score', 'desc');

// Calculate various statistics on the sorted dataset
const averageScore = calculateAverage(sortedByScore, 'score');
const medianScore = calculateMedian(sortedByScore, 'score');
const standardDeviationScore = calculateStandardDeviation(sortedByScore, 'score');

// Output the results
console.log(`Average Score: ${averageScore}`);
console.log(`Median Score: ${medianScore}`);
console.log(`Standard Deviation of Score: ${standardDeviationScore}`);

/**
 * Generates a random dataset of individuals with properties like id, name, age, and score.
 * @param {number} count - The number of individuals to generate.
 * @returns {object[]} - An array of generated individuals.
 */
function generateRandomDataset(count) {
  const dataset = [];
  for (let i = 1; i <= count; i++) {
    const individual = {
      id: i,
      name: generateRandomName(),
      age: generateRandomNumber(18, 50),
      score: generateRandomNumber(0, 100)
    };
    dataset.push(individual);
  }
  return dataset;
}

// Helper functions for generating random properties
function generateRandomName() { /* ... */ }
function generateRandomNumber(min, max) { /* ... */ }

/**
 * Sorts a dataset based on a given property in ascending or descending order.
 * @param {object[]} dataset - The dataset to sort.
 * @param {string} property - The property by which to sort the dataset.
 * @param {string} order - The sorting order ('asc' for ascending, 'desc' for descending).
 * @returns {object[]} - The sorted dataset.
 */
const sortByProperty = (dataset, property, order) => {
  const sortedDataset = [...dataset];
  sortedDataset.sort((a, b) => {
    if (order === 'asc') {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
    } else if (order === 'desc') {
      if (a[property] > b[property]) return -1;
      if (a[property] < b[property]) return 1;
    }
    return 0;
  });
  return sortedDataset;
}

/**
 * Filters a dataset based on a given property and range of values.
 * @param {object[]} dataset - The dataset to filter.
 * @param {string} property - The property by which to filter the dataset.
 * @param {number} minValue - The minimum value for the given property.
 * @param {number} maxValue - The maximum value for the given property.
 * @returns {object[]} - The filtered dataset.
 */
const filterByRange = (dataset, property, minValue, maxValue) => {
  return dataset.filter(individual => individual[property] >= minValue && individual[property] <= maxValue);
}

/**
 * Calculates the average value of a given property in a dataset.
 * @param {object[]} dataset - The dataset to calculate the average from.
 * @param {string} property - The property by which to calculate the average.
 * @returns {number} - The average value.
 */
const calculateAverage = (dataset, property) => {
  const sum = dataset.reduce((acc, individual) => acc + individual[property], 0);
  return sum / dataset.length;
}

/**
 * Calculates the median value of a given property in a dataset.
 * @param {object[]} dataset - The dataset to calculate the median from.
 * @param {string} property - The property by which to calculate the median.
 * @returns {number} - The median value.
 */
const calculateMedian = (dataset, property) => {
  const sortedValues = dataset.map(individual => individual[property]).sort();
  const mid = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 0) {
    return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
  } else {
    return sortedValues[mid];
  }
}

/**
 * Calculates the standard deviation of a given property in a dataset.
 * @param {object[]} dataset - The dataset to calculate the standard deviation from.
 * @param {string} property - The property by which to calculate the standard deviation.
 * @returns {number} - The standard deviation value.
 */
const calculateStandardDeviation = (dataset, property) => {
  const values = dataset.map(individual => individual[property]);
  const mean = calculateAverage(dataset, property);
  const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
  const variance = calculateAverage(squaredDifferences, '');
  return Math.sqrt(variance);
}