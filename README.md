# Exporting Facebook Ads data to Google Sheets

This script was built to export Facebook Ads data to Google Sheets on a recurring basis for use in a dashboard.

In order to bypass limits around the amount of data that can be processed by the Facebook Marketing API and [Google App Script's
6 minute runtime maximum](https://developers.google.com/apps-script/guides/services/quotas), the script makes [asynchronous requests](https://developers.facebook.com/docs/marketing-api/asyncrequests/) to the Facebook Marketing API.

## Setup

You'll first want to create a [Facebook App](https://developers.facebook.com/apps/) and add the Marketing API product to it.

You can then get a short-lived user access token through the [Graph API Explorer](https://developers.facebook.com/tools/explorer/).

If you're going to be using this script on an ongoing basis, I recommend you exhcnage your short-lived token for a long-lived one using [this method](https://developers.facebook.com/docs/facebook-login/access-tokens/refreshing#exchanging-short-lived-tokens-for-long-lived-tokens).

Once you've entered your credentials as well as all parameters, you'll want to make sure that [request-facebook-report.js](https://github.com/fredericharnois/facebook-ads-reporting-google-apps-script/blob/master/request-facebook-report.js) is scheduled to run before [get-facebook-report.js](https://github.com/fredericharnois/facebook-ads-reporting-google-apps-script/blob/master/get-facebook-report.js).
