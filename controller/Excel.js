const fs = require("fs");
const xlsx = require("xlsx");

/// Function to update the Excel sheet
function updateExcelSheet(existingExcelFilePath, newReferralData) {
    try {
      // Read the existing data from the Excel sheet
      const workbook = xlsx.readFile(existingExcelFilePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      // Convert the worksheet to an array of objects
      const existingData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Remove the header row from the existing data
      existingData.shift();
  
      // Convert the new referral data to an array of arrays
      const newReferralArray = newReferralData.map((referral) => Object.values(referral));
  
      // Combine the existing data and the new referral data
      const allData = [...existingData, ...newReferralArray];
  
      // Create a new worksheet with the updated data
      const newWorksheet = xlsx.utils.aoa_to_sheet([['Email', 'Last Name', 'First Name', 'Contact', 'Location', 'Course', 'Duration'], ...allData]);
  
      // Update the workbook with the new worksheet
      workbook.Sheets[sheetName] = newWorksheet;
  
      // Write the updated workbook back to the Excel file
      xlsx.writeFile(workbook, existingExcelFilePath);
  
      return existingExcelFilePath;
    } catch (error) {
      console.error('Error updating Excel sheet:', error);
      return null;
    }
  }
  

module.exports = { updateExcelSheet };
