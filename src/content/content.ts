import { ContentInterface, MutationType } from '../types/all.ts';

const clickButtonByXPath = (xpath: string, mutation: MutationType) => {
  if (!mutation?.addedNodes?.length) {
    return;
  }

  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  const button = result.singleNodeValue as HTMLButtonElement | null;
  button?.click();
};

const content: ContentInterface = {
  clickSkipButton: (mutation: MutationType) => {
    clickButtonByXPath("//button[contains(.,'イントロをスキップ')]", mutation);
  },
  clickNextEpisodeButton: (mutation: MutationType) => {
    clickButtonByXPath("//button[contains(.,'次のエピソード')]", mutation);
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
