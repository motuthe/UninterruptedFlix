import { ContentInterface, MutationType } from '../types/all.ts';

const content: ContentInterface = {
  clickSkipButton: (mutation: MutationType) => {
    if (mutation && mutation.addedNodes && mutation.addedNodes.length) {
      const result = document.evaluate(
        "//button[contains(.,'イントロをスキップ')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      );
      if (result) {
        const skipButton = result.singleNodeValue as HTMLButtonElement | null;
        if (skipButton) {
          skipButton.click();
        }
      }
    }
  },
  clickNextEpisodeButton: (mutation: MutationType) => {
    if (mutation && mutation.addedNodes && mutation.addedNodes.length) {
      const result = document.evaluate(
        "//button[contains(.,'次のエピソード')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      );
      if (result) {
        const nextButton = result.singleNodeValue as HTMLButtonElement | null;
        if (nextButton) {
          nextButton.click();
        }
      }
    }
  },
  observeDOM: () => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      chrome.storage.sync.get(
        ['skipIntro', 'nextEpisode'],
        (data: { skipIntro?: boolean; nextEpisode?: boolean }) => {
          if (data.skipIntro) {
            mutations.forEach(content.clickSkipButton);
          }
          if (data.nextEpisode) {
            mutations.forEach(content.clickNextEpisodeButton);
          }
        },
      );
    });
    observer.observe(document, { childList: true, subtree: true });
  },
};

content.observeDOM();

export default content;
