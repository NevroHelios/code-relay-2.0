const fs = require('fs');
const csvData = [
  ['Barcode Type', 'Barcode Value', 'Description'],
  ['Code 39', '12345', 'Lab Access (Extra Time in IIT)'],
  ['Code 128', 'ABCDE', 'Food (Cafeteria Coupons)'],
  ['Code 11', '67890', 'Stationary (Lab Notebooks)']
];

// Convert the array to CSV format
const csvContent = csvData.map(row => row.join(',')).join('\n');

// Write the CSV content to a file
fs.writeFile('barcodes.csv', csvContent, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('barcodes.csv created successfully!');
  }
});
