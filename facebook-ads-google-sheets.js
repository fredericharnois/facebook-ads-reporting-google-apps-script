/**
*
* Export Facebook Ads Data to Google Sheets
*
* Version: 0.1
* Google Apps Script maintained by Frederic Harnois
*
**/

var SPREADSHEET_URL = 'INSERT_URL'

var TOKEN = '&access_token=' + 'INSERT_TOKEN'
var AD_ACCOUNT_ID = 'INSERT_AD_ACCOUNT_ID'
var LEVEL = '/insights?level=' + 'campaign'
var FIELDS = '&fields=' + 'campaign_name,impressions,inline_link_clicks,spend'
var DATE_RANGE = '&date_preset=' + 'lifetime'

var GRAPH_API = 'https://graph.facebook.com/v2.12/act_'

function myFunction() {

  // Opens the spreadsheet and selects the 'facebook' sheet
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName('facebook');

  // Clears previous data
  sheet.clear();

  // Adds column headers
  sheet.appendRow(['Campaign Name','Impressions','Link Clicks','Spend'])
  Utilities.sleep(100);

  // Builds the Facebook Ads Insights API URL
  var facebookUrl = 
    GRAPHAPI + 
    AD_ACCOUNT_ID +
    LEVEL +
    FIELDS +
    TOKEN +
    DATE_RANGE +
    '&limit=1000'; 

  // Fetches & parses the URL 
  var fetchRequest = UrlFetchApp.fetch(facebookUrl);
  var results = JSON.parse(fetchRequest.getContentText());
  
  // Pushes data to the sheet
  var i = 0;
  var len = results.data.length
  for (; i < len; i++) {
    var row = []
    var campaignName = results.data[i].campaign_name
    row.push(campaignName)
    Utilities.sleep(25);
    var impressions = results.data[i].impressions
    row.push(impressions)
    Utilities.sleep(25);
    var linkClicks = results.data[i].inline_link_clicks
    row.push(linkClicks)
    Utilities.sleep(25);
    var spend = results.data[i].spend
    row.push(spend)
    sheet.appendRow(row)

  }
}