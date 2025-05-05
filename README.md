# Productivity Reminder - Chrome Extension

A Chrome extension that helps you stay focused by showing a reminder popup when you visit distracting websites like YouTube, TikTok, Instagram

## Features

- Displays a centered popup reminder when you visit distracting websites
- Tracks and shows time spent on these websites
- Gives you the option to continue or redirect to a productivity site
- Works on multiple distracting platforms (YouTube, TikTok, Instagram)
- Responsive design that works on all screen sizes
- Shows each reminder only once per session per site (won't keep annoying you)

## Installation

Since this extension isn't published to the Chrome Web Store yet, you'll need to install it in developer mode:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select the folder where you downloaded/extracted this extension
4. The extension should now be installed and active

## How It Works

1. When you visit any of the configured distracting websites, the extension will display a popup after a short delay
2. The popup reminds you that you're on a distracting site and shows how much time you've spent there
3. You have two options:
   - **Continue anyway**: Dismiss the popup and continue using the site
   - **Back to work**: Redirect to a productivity site (like Google)
4. The timer continues to track your time even after dismissing the popup

## Customization

### Adding or Removing Distracting Websites

To customize the list of websites that trigger the reminder:

1. Open the file `/js/contentScript.js`
2. Find the `distractingSites` object at the top of the file:

```javascript
const distractingSites = {
  "tiktok.com": "TikTok",
  "youtube.com": "YouTube",
  "instagram.com": "Instagram",
};
```

3. Add or remove entries as needed, following the format `'domain.com': 'Display Name'`
4. Save the file and reload the extension from the extensions page

### Customizing Productivity Destinations

To change where the "Back to work" button redirects:

1. Open the file `/js/contentScript.js`
2. Find the `productivitySites` array in the `backToWork()` method:

```javascript
const productivitySites = [
  "https://www.karanpratapsingh.com/courses/system-design",
  "https://www.google.com",
  "https://learn.uwaterloo.ca",
  "https://github.com",
];
```

3. Add, remove, or modify the URLs in this array
4. Save the file and reload the extension

### Styling the Modal

To customize the appearance of the reminder popup:

1. Open the file `/css/modal.css`
2. Modify the CSS properties to match your preferred style
3. Save the file and reload the extension

## Future Enhancements

Some possible features to add in the future:

- Settings page to configure websites and appearance
- Custom messages for different websites
- Daily time limits for distracting sites
- Statistics tracking
- Sync settings across devices

## Troubleshooting

If the extension doesn't work:

1. Make sure it's enabled in the Chrome extensions page
2. Check that you're visiting one of the configured distracting websites
3. Try reloading the page
4. If necessary, reinstall the extension

## License

This project is for personal use. Feel free to modify it for your own needs.
