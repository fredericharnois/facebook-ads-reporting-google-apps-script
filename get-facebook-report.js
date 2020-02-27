/**
*
* Export Facebook Ads Data to Google Sheets
* 
* Pushes the Facebook asynchronous report to Google Sheets
*
* Version: 2.2
*
* Google Apps Script maintained by Frederic Harnois
* fred@fredericharnois.com
*
**/

// MODIFY YOUR SETTINGS HERE //

// url of the google sheets where the report will be
const SPREADSHEET_URL = 'INSERT_URL'

// name of the sheet where the report will be
const TAB_NAME = 'INSERT_TAB_NAME'

// DO NOT MODIFY ANYTHING BELOW //

function getFacebookReport() {
  
  // Selects the chosen sheet and tab
  const ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const sheet = ss.getSheetByName(TAB_NAME);
  
  // Clears the sheet
  sheet.clear();
  
  // Gets the Facebook report run ID
  const cache = CacheService.getScriptCache();
  const reportId = cache.get('campaign-report-id');

  // Fetches the report as a csv file
  const url = `https://www.facebook.com/ads/ads_insights/export_report?report_run_id=${reportId}&format=csv&access_token=${TOKEN}`;
  const fetchRequest = UrlFetchApp.fetch(url);
  const results = Utilities.parseCsv(fetchRequest);
  
  // Pastes the csv file in the sheet
  sheet.getRange(1,1, results.length, results[0].length).setValues(results);
}