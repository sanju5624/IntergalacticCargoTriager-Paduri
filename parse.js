const fs = require('fs');
const path = require('path');

// Configure last name here
const LAST_NAME = 'Paduri';

/**
 * Checks if a number is a prime number.
 * 
 * Performance:
 * - Checks divisibility using the 6k +/- 1 method, which skips multiples of 2 and 3.
 * - Loop condition uses multiplication (i * i <= num) instead of Math.sqrt(num) 
 *   to avoid repeated square root calculations or floating point conversions.
 */
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Parses the manifest.txt file and returns the clean and discarded records.
 */
function parseManifest() {
  // Check current directory first, then parent directory (supporting multiple file structures)
  let manifestPath = path.join(__dirname, 'manifest.txt');
  if (!fs.existsSync(manifestPath)) {
    manifestPath = path.join(__dirname, '..', 'manifest.txt');
  }

  if (!fs.existsSync(manifestPath)) {
    console.error(`Error: manifest.txt not found at: ${manifestPath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(manifestPath, 'utf8');
  // Split on both Unix (\n) and Windows (\r\n) newlines cleanly
  const lines = rawContent.split(/\r?\n/);

  const records = [];
  const discarded = [];

  // Match: [DATE] || CARGO_ID :: WEIGHT_IN_KG >> DESTINATION
  const regex = /^\[(.+?)\]\s*\|\|\s*(.+?)\s*::\s*(\d+(?:\.\d+)?)\s*>>\s*(.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip blank lines

    const match = line.match(regex);
    if (!match) {
      console.warn(`Skipping malformed line ${i + 1}: "${line}"`);
      continue;
    }

    const date = match[1].trim();
    const cargoId = match[2].trim();
    let weightInKg = parseFloat(match[3].trim());
    const destination = match[4].trim();

    // Business Rule 1: If DESTINATION contains the exact substring "Sector-7", multiply WEIGHT_IN_KG by 1.45.
    if (destination.includes('Sector-7')) {
      weightInKg = weightInKg * 1.45;
    }

    // Business Rule 2: Round weight to the nearest whole number.
    const roundedWeight = Math.round(weightInKg);

    // Discard the record if the final weight is a Prime Number.
    if (isPrime(roundedWeight)) {
      discarded.push({
        cargoId,
        destination,
        weightInKg: roundedWeight,
        reason: `calculated weight ${roundedWeight} is prime`
      });
      continue;
    }

    records.push({
      date,
      cargoId,
      weightInKg: roundedWeight,
      destination
    });
  }

  return { records, discarded };
}

function main() {
  const { records, discarded } = parseManifest();

  // Determine output directory path. If running directly in workspace,
  // we can output to an 'output' folder in the project.
  const outputDir = path.join(__dirname, 'output');
  
  // Ensure output directory exists to prevent ENOENT crash when writing the file
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFileName = `Task 1 - ${LAST_NAME} - Parser.json`;
  const outputPath = path.join(outputDir, outputFileName);

  fs.writeFileSync(outputPath, JSON.stringify(records, null, 2), 'utf-8');

  console.log(`\nSuccess! Parsed ${records.length} valid records -> ${outputPath}`);
  console.log(`Discarded ${discarded.length} record(s) with prime weights:`);
  for (const d of discarded) {
    console.log(`  - ${d.cargoId} (${d.destination}): ${d.reason}`);
  }
}

main();
