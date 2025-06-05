![UninterruptedFlix Logo](./src/assets/images/logo.png)

## Description

UninterruptedFlix is a Chrome extension that enhances your Netflix viewing experience. It automatically clicks the 'Skip Intro' and 'Next Episode' buttons on Netflix videos as soon as they appear, providing an uninterrupted viewing experience. The extension detects your Netflix language setting and uses the correct label for that language – English, Japanese, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Korean, or Arabic – so it works seamlessly no matter which language you use.

## Installation

1. Download or clone this repository to your local machine.
2. Run `npm install` and then `npm run build` to generate the `dist` folder.
3. Open the Chrome browser and navigate to `chrome://extensions`.
4. Enable Developer mode by ticking the checkbox in the upper-right corner.
5. Click on the "Load unpacked" button and select the `dist` directory created in the previous step.

## Build

Run `npm run build` whenever you make changes to regenerate the extension in the `dist` folder.

## Usage

Once installed, the extension will automatically skip intros and jump to the next episode when possible. You can enable or disable these features by clicking on the extension icon in the Chrome toolbar.

## For Developers

This project is built with TypeScript. The main logic is in the `src/content/content.ts` file. This script uses a MutationObserver to detect when the 'Skip Intro' and 'Next Episode' buttons appear on the page and clicks them.

The extension's settings and metadata are defined in the `manifest.json` file. This includes the permissions the extension needs, the scripts it runs, and the icons it uses.

Feel free to contribute to this project by submitting pull requests. Before opening one, run `npm run lint` and `npm test` to ensure code quality.

## License

This project is licensed under the MIT License.
