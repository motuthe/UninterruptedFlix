![UninterruptedFlix Logo](./src/assets/images/logo.png)
## Description

UninterruptedFlix is a Chrome extension that enhances your Netflix viewing experience. It automatically clicks the 'Skip Intro' button on Netflix videos as soon as it appears, providing an uninterrupted viewing experience.

## Installation

1. Download or clone this repository to your local machine.
2. Open the Chrome browser and navigate to `chrome://extensions`.
3. Enable Developer mode by ticking the checkbox in the upper-right corner.
4. Click on the "Load unpacked" button.
5. Navigate to the directory where you saved this repository and click "OK".

## Usage

Once installed, the extension will automatically skip intros in Netflix shows. You can enable or disable this feature by clicking on the extension icon in the Chrome toolbar.

## For Developers

This project is built with TypeScript. The main logic is in the `src/content/content.ts` file. This script uses a MutationObserver to detect when the 'Skip Intro' button appears on the page and clicks it.

The extension's settings and metadata are defined in the `manifest.json` file. This includes the permissions the extension needs, the scripts it runs, and the icons it uses.

Feel free to contribute to this project by submitting pull requests.

## License

This project is licensed under the MIT License.
