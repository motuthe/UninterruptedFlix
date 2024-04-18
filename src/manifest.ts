import { defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest(async () => ({
    "manifest_version": 3,
    "name": "UninterruptedFlix",
    "version": "0.0.1",
    "description": "This extension automatically clicks the 'Skip Intro' button on Netflix videos as soon as it appears, providing an uninterrupted viewing experience.",
    "permissions": ["activeTab", "storage"],
    "content_scripts": [
    {
        "matches": ["*://*.netflix.com/*"],
        "js": ["content/content.ts"]
    }
],
    "action": {
    "default_popup": "popup/popup.html"
},
    "icons": {
        "16": "assets/images/n16.png",
        "48": "assets/images/n48.png",
        "128": "assets/images/n128.png",
}
}));

export default manifest;