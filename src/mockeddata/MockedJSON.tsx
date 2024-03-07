/**
* A basic function to build a map of mocked csv files. The map has keys that are 
* strings, and maps to either a string (on error) or a 2D array of strings (on success), 
* mirroring the possible outputs for any command in this interface.
* 
* @returns a map of mocked csv files.
*/
export function MockCSVFiles() {
  const files = new Map();

  // Basic csv with numbers no header.
  files.set("numbers-basic.csv", [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ]);

  // Basic csv with strings for names with header.
  files.set("people-header.csv", [
    ["First-Name", "Middle-Name", "Last-Name"],
    ["Gavin", "Raj", "Dhanda"],
    ["Julian", "Madan", "Dhanda"],
    ["Adelle", "Kristyna", "Dhanda"],
    ["Asia", "Max", "Wynn"],
    ["Eleanor", "", "Park"],
    ["Eleanor", "Really Long Middle Name", "Park"],
    ["Last", "Row", "Here"],
  ]);

  // Test visual output with a really long csv.
  files.set("really-long.csv", [
    [
      "Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin Gavin",
      "Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj Raj",
      "Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda Dhanda",
    ],
    ["Julian", "Madan", "Dhanda"],
  ]);

  // Edge cases for empty and malformed csv data.
  files.set(
    "malformed-file.csv",
    "The csv file was malformed! Data not loaded."
  );
  files.set("empty-file.csv", "The csv file was empty! No data available.");

  // Return map with files.
  return files;
}

/**
* A basic function to build a map of mocked search results. The map has keys that are 
* strings, and maps to either a string (on error) or a 2D array of strings (on success), 
* mirroring the possible outputs for any command in this interface.
* 
* @returns a map of mocked search data.
*/
export function MockCSVSearch() {
  const results = new Map();

  // Mock search results for the numbers csv, which has no header.
  results.set("2", [["1", "2", "3"]]); // Search all for "2"
  results.set("header,1", "Error: CSV file does not have a header row!"); // Specify header
  results.set("0,1", [["1", "2", "3"]]); // Specify search column
  results.set("0,3", "Value not found in specified column!"); // Val not found col
  results.set("10", "Value not found in file!"); // Val not found any

  // Mock search results for the people csv, which has a header.
  results.set("raj", [
    // Search all for "Raj"
    ["Gavin", "Raj", "Dhanda"],
    ["Raj", "", "Dhanda"],
  ]);
  results.set("last-name,dhanda", [
    // Specify header
    ["Julian", "Madan", "Dhanda"],
    ["Adelle", "Kristyna", "Dhanda"],
    ["Gavin", "Raj", "Dhanda"],
    ["Raj", "", "Dhanda"],
    ["Michelle", "Kral", "Dhanda"],
  ]);
  results.set("nick-name,gavin", "Error: Header not found!"); // Invalid header specified
  results.set("10,eleanor", "Error: Index out of range for loaded CSV file!"); // Invalid index

  // Return map with results.
  return results;
}
