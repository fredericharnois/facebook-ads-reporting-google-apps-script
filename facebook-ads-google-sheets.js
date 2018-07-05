/**
*
* Export Facebook Ads Data to Google Sheets
*
* Version: 1.0
* Google Apps Script maintained by Frederic Harnois
*
**/

var SPREADSHEET_URL = 'INSERT_URL'

var TOKEN = '&access_token=' + 'INSERT_TOKEN'
var AD_ACCOUNT_ID = 'INSERT_AD_ACCOUNT_ID'
var LEVEL = '/insights?level=' + 'campaign'
var FIELDS = '&fields=' + 'campaign_name,impressions,inline_link_clicks,spend,actions,action_values'
var DATE_RANGE = '&date_preset=' + 'lifetime'

var GRAPH_API = 'https://graph.facebook.com/v3.0/act_'

function myFunction() {

  // Opens the spreadsheet and selects the 'facebook' sheet
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName('facebook');

  // Clears previous data
  sheet.clear();

  // Adds column headers
  sheet.appendRow(['Campaign Name','Impressions','Link Clicks','Spend', 'Purchases','Revenue'])
  Utilities.sleep(100);

  // Builds the Facebook Ads Insights API URL
  var facebookUrl = 
    GRAPH_API + 
    AD_ACCOUNT_ID +
    LEVEL +
    FIELDS +
    DATE_RANGE +
    TOKEN +
    '&limit=1000';
  var encodedFacebookUrl = encodeURI(facebookUrl)
  
  // Fetches & parses the URL 
  var fetchRequest = UrlFetchApp.fetch(encodedFacebookUrl);
  var results = JSON.parse(fetchRequest.getContentText());
  
  // Pushes data to the sheet
  for (i = 0; i < results.data.length; i++) {
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
    Utilities.sleep(25);

    var actionType = []
    for (j = 0; j < results.data[i].actions.length; j++) {
      actionType.push(results.data[i].actions[j].action_type)
    }

    if (actionType.indexOf('offsite_conversion.fb_pixel_purchase') != -1) {
      for (k = 0; k < results.data[i].actions.length; k++) {
        if (results.data[i].actions[k].action_type.indexOf('offsite_conversion.fb_pixel_purchase') != -1) {
          var conversion = results.data[i].actions[k].value
          row.push(conversion)
        }
      } 
    }
    else {
      row.push(0)
    }
    Utilities.sleep(25);

    var actionValue = []
    for (l = 0; l < results.data[i].action_values.length; l++) {
      actionValue.push(results.data[i].action_values[l].action_type)
    }

    if (actionValue.indexOf('offsite_conversion.fb_pixel_purchase') != -1) {
      for (m = 0; m < results.data[i].action_values.length; m++) {
        if (results.data[i].action_values[m].action_type.indexOf('offsite_conversion.fb_pixel_purchase') != -1) {
          var conversion = results.data[i].action_values[m].value
          row.push(conversion)
        }
      } 
    }
    else {
      row.push(0)
    }

    sheet.appendRow(row)

  }
}