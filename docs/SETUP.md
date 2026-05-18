# Early Adopter Form Setup Guide

This directory contains the Early Adopter registration form hosted on GitHub Pages.

## Configuration

The form is designed to post data to a Google Apps Script web app that connects to a Google Sheet.

### Setup Instructions

1. **Create a Google Sheet**
   - Create a new Google Sheet to store registrations
   - Add column headers: Name, Email, Company, Interest, Timestamp

2. **Create a Google Apps Script**
   - Open your Google Sheet
   - Go to Extensions > Apps Script
   - Replace the default code with the following:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = e.parameter;
    
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.company || '',
      data.interest || '',
      data.timestamp || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput('Success');
  } catch(error) {
    Logger.log(error);
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}
```

3. **Deploy as Web App**
   - Click "Deploy" > "New deployment"
   - Select type: "Web app"
   - Execute as: (your email)
   - Who has access: "Anyone"
   - Click "Deploy"
   - Copy the deployment URL

4. **Add the URL as a Repository Secret**
   - Go to Repository Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `GOOGLE_APPS_SCRIPT_URL`
   - Value: Paste your Google Apps Script deployment URL
   - Click "Add secret"

5. **Enable GitHub Pages**
   - Go to Repository Settings > Pages
   - Select Source: "GitHub Actions"
   - The workflow will automatically deploy to GitHub Pages

## GitHub Pages Hosting

The form is automatically hosted on GitHub Pages at:
```
https://keplar-flow-ltd.github.io/.github/
```

The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) automatically:
1. Reads the `GOOGLE_APPS_SCRIPT_URL` secret from repository settings
2. Injects it into the form HTML
3. Deploys to GitHub Pages on every push to main

## Testing

1. Visit the form URL
2. Fill out the form with test data
3. Submit and verify the data appears in your Google Sheet

## Troubleshooting

- **Form submission fails**: Verify the Google Apps Script URL is correct
- **Data not appearing**: Check Google Apps Script logs for errors
- **CORS issues**: Google Apps Script requires `mode: 'no-cors'` in the fetch request
