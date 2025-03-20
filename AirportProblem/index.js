const minPlanesToReachEnd = (fuelArray) => {
  let n = fuelArray.length;
  if (n === 1) return 0; // If only one airport, no need to move

  let maxReach = 0; // Track the farthest airport reachable
  let planesCount = 0; // Count the number of planes taken
  let end = 0; // Marks the end of the current jump range

  for (let i = 0; i < n - 1; i++) {
    maxReach = Math.max(maxReach, i + fuelArray[i]); // Update max reach
    if (i === end) { // If we reach the end of the current jump range
      planesCount++;
      end = maxReach; // Move to the farthest reachable point
      if (end >= n - 1) return planesCount; // If we can reach the last airport, return planesCount
    }
  }

  return -1; // If we never reach the last airport
}

// Test Cases
console.log(minPlanesToReachEnd([2, 1, 2, 3, 1])); // Output: 2
console.log(minPlanesToReachEnd([1, 6, 3, 4, 5, 0, 0, 0, 6])); // Output: 3