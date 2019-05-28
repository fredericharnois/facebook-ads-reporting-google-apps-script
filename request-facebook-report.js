/**
*
* Export Facebook Ads Data to Google Sheets
* 
* Requests a Facebook report asynchronously and caches the report ID
*
* Version: 2.1
* Google Apps Script maintained by Frederic Harnois
*
**/

// MODIFY YOUR REPORT HERE //

// ad account ID
var AD_ACCOUNT_ID = 'INSERT_AD_ACCOUNT_ID'

// ad, adset, campaign, account
var LEVEL = 'INSERT_LEVEL'

// https://developers.facebook.com/docs/marketing-api/insights/parameters#fields
var FIELDS = 'INSERT_FIELDS'

// https://developers.facebook.com/docs/marketing-api/insights/parameters#param
var DATE_RANGE = 'INSERT_DATE_RANGE'

// user access token linked to a Facebook app
var TOKEN = 'INSERT_TOKEN'

// number of days from 1 to 90
var TIME_INCREMENT = 'INSERT_TIME_INCREMENT'

// https://developers.facebook.com/docs/marketing-api/insights/parameters#param
var FILTERING = 'INSERT_FILTERS'

// DO NOT MODIFY ANYTHING BELOW //

function requestFacebookReport() {

  // Builds the Facebook Ads Insights API URL
  var facebookUrl = 
    'https://graph.facebook.com/v3.3' + 
    '/act_' + AD_ACCOUNT_ID +
    '/insights?level=' + LEVEL +
    '&fields=' + FIELDS +
    '&date_preset=' + DATE_RANGE +
    '&access_token=' + TOKEN +
    '&time_increment=' + TIME_INCREMENT +
    '&filtering=' + FILTERING +
    '&limit=1000';
  var encodedFacebookUrl = encodeURI(facebookUrl);
  var options = {
    'method' : 'post'
  };
  
  // Fetches & parses the URL 
  var fetchRequest = UrlFetchApp.fetch(encodedFacebookUrl, options);
  var results = JSON.parse(fetchRequest.getContentText());
  
  // Caches the report run ID
  var reportId = results.report_run_id;
  var cache = CacheService.getScriptCache();
  var cached = cache.get("campaign-report-id");
  
  if (cached != null) {
    cache.put("campaign-report-id", [], 1);
    Utilities.sleep(1001);
    cache.put("campaign-report-id", reportId, 21600);
    }
  else {
    cache.put("campaign-report-id", reportId, 21600); 
    }
  Logger.log(cache.get('campaign-report-id'));
}