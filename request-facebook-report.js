/**
*
* Export Facebook Ads Data to Google Sheets
* 
* Requests a Facebook report asynchronously and caches the report ID
*
* Version: 2.2
*
* Google Apps Script maintained by Frederic Harnois
* fred@fredericharnois.com
*
**/

// MODIFY YOUR REPORT HERE //

// ad account ID
const AD_ACCOUNT_ID = 'INSERT_AD_ACCOUNT_ID'

// ad, adset, campaign, account
const LEVEL = 'INSERT_LEVEL'

// https://developers.facebook.com/docs/marketing-api/insights/parameters#fields
const FIELDS = 'INSERT_FIELDS'

// https://developers.facebook.com/docs/marketing-api/insights/parameters#param
const DATE_RANGE = 'INSERT_DATE_RANGE'

// user access token linked to a Facebook app
const TOKEN = 'INSERT_TOKEN'

// number of days from 1 to 90
const TIME_INCREMENT = 'INSERT_TIME_INCREMENT'

// https://developers.facebook.com/docs/marketing-api/insights/parameters#param
const FILTERING = 'INSERT_FILTERS'

// DO NOT MODIFY ANYTHING BELOW //

function requestFacebookReport() {

  // Builds the Facebook Ads Insights API URL
  const facebookUrl = `https://graph.facebook.com/v6.0/act_${AD_ACCOUNT_ID}/insights?level=${LEVEL}&fields=${FIELDS}&date_preset=${DATE_RANGE}&access_token=${TOKEN}&time_increment=${TIME_INCREMENT}&filtering=${FILTERING}&limit=1000`;
  const encodedFacebookUrl = encodeURI(facebookUrl);
  
  const options = {
    'method' : 'post'
  };
  
  // Fetches & parses the URL 
  const fetchRequest = UrlFetchApp.fetch(encodedFacebookUrl, options);
  const results = JSON.parse(fetchRequest.getContentText());
  
  // Caches the report run ID
  const reportId = results.report_run_id;
  const cache = CacheService.getScriptCache();
  const cached = cache.get('campaign-report-id');
  
  if (cached != null) {
    cache.put('campaign-report-id', [], 1);
    Utilities.sleep(1001);
    cache.put('campaign-report-id', reportId, 21600);
  } else {
    cache.put('campaign-report-id', reportId, 21600); 
  };
  
  Logger.log(cache.get('campaign-report-id'));
}