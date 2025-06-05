import { ContentInterface, MutationType } from '../types/all.ts';
import { getLabels, buildXPath } from './i18n.ts';

const queryButton = (label: string): HTMLButtonElement | null => {
  const result = document.evaluate(
    buildXPath(label),
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  return result.singleNodeValue as HTMLButtonElement | null;
};

const clickButton = (label: string) => {
  const btn = queryButton(label);
  btn?.click();
};

const content: ContentInterface = {
  clickSkipButton: (mutation: MutationType) => {
    if (!mutation?.addedNodes.length) return;
    clickButton(getLabels().skipIntro);
  },
  clickNextEpisodeButton: (mutation: MutationType) => {
    if (!mutation?.addedNodes.length) return;
    clickButton(getLabels().nextEpisode);
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
