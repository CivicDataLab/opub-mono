export function getRandomNumber(min: number, max: number) {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();
  
    // Scale the decimal to the desired range and round it to an integer
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
  
    return randomNumber;
  }