import { ContentInterface, MutationType } from './types';

const content: ContentInterface = {
  clickSkipButton: (mutation: MutationType) => {
    if (mutation && mutation.addedNodes && mutation.addedNodes.length) {
      const skipButton = document.querySelector(
        'div.watch-video--skip-content > button',
      ) as HTMLButtonElement | null;
      if (skipButton) {
        skipButton.click();
      }
    }
  },
  observeDOM: () => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      chrome.storage.sync.get('skipIntro', (data: { skipIntro?: boolean }) => {
        if (data.skipIntro) {
          mutations.forEach(content.clickSkipButton);
        }
      });
    });
    observer.observe(document, { childList: true, subtree: true });
  },
};

content.observeDOM();

export default content;
