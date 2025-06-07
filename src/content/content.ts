import { ContentInterface, MutationType } from '../types/all.ts';

// Labels for the "Skip Intro" and "Next Episode" buttons in various languages.
// The extension uses these to find the correct buttons based on the page's lang attribute.

// Mapping of language codes to the button labels shown by Netflix.
const LANGUAGE_LABELS = {
  en: { skipIntro: 'Skip Intro', nextEpisode: 'Next Episode', skipRecap: 'Skip Recap' },
  ja: {
    skipIntro: 'イントロをスキップ',
    nextEpisode: '次のエピソード',
    skipRecap: '前﻿回﻿ま﻿で﻿のあ﻿ら﻿す﻿じ﻿をス﻿キ﻿ッ﻿プ',
  },
  es: {
    skipIntro: 'Saltar introducción',
    nextEpisode: 'Siguiente episodio',
    skipRecap: 'Omitir recapitulación',
  },
  fr: {
    skipIntro: "Passer l'intro",
    nextEpisode: 'Épisode suivant',
    skipRecap: 'Passer le récapitulatif',
  },
  de: {
    skipIntro: 'Intro überspringen',
    nextEpisode: 'Nächste Folge',
    skipRecap: 'Rückblick überspringen',
  },
  it: {
    skipIntro: "Salta l'intro",
    nextEpisode: 'Prossimo episodio',
    skipRecap: 'Salta il riassunto',
  },
  pt: {
    skipIntro: 'Pular introdução',
    nextEpisode: 'Próximo episódio',
    skipRecap: 'Pular recapitulação',
  },
  ru: {
    skipIntro: 'Пропустить заставку',
    nextEpisode: 'Следующая серия',
    skipRecap: 'Пропустить ранее',
  },
  zh: { skipIntro: '跳过片头', nextEpisode: '下一集', skipRecap: '跳过回顾' },
  ko: { skipIntro: '인트로 건너뛰기', nextEpisode: '다음 화', skipRecap: '이전 내용 건너뛰기' },
  ar: { skipIntro: 'تخطي المقدمة', nextEpisode: 'الحلقة التالية', skipRecap: 'تخطي الملخص' },
} as const;

type LangCode = keyof typeof LANGUAGE_LABELS;

const DEFAULT_LANG: LangCode = 'en';

// Determine which language should be used to query buttons based on the page.
const getLangCode = (): LangCode => {
  const html = document.documentElement;
  const langAttr = html.getAttribute('lang')?.toLowerCase() ?? '';
  const match = Object.keys(LANGUAGE_LABELS).find((code) => langAttr.startsWith(code));
  return (match as LangCode) || DEFAULT_LANG;
};

const getLabels = () => LANGUAGE_LABELS[getLangCode()];

// Build an XPath expression that matches a button containing the given label.
const buildXPath = (label: string) => `//button[contains(.,'${label}')]`;

// Look for a button matching the label via XPath.
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

// Click the button if it is found in the DOM.
const clickButton = (label: string) => {
  const btn = queryButton(label);
  btn?.click();
};

// Create a handler that clicks a button when the DOM mutates.
const createClickHandler = (getLabel: () => string) => (mutation: MutationType) => {
  if (!mutation?.addedNodes.length) return;
  clickButton(getLabel());
};

const content: ContentInterface = {
  clickSkipButton: createClickHandler(() => getLabels().skipIntro),
  clickNextEpisodeButton: createClickHandler(() => getLabels().nextEpisode),
  clickSkipRecapButton: createClickHandler(() => getLabels().skipRecap),
  observeDOM: () => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      chrome.storage.sync.get(
        ['skipIntro', 'nextEpisode', 'skipRecap'],
        (data: { skipIntro?: boolean; nextEpisode?: boolean; skipRecap?: boolean }) => {
          if (data.skipIntro) {
            mutations.forEach(content.clickSkipButton);
          }
          if (data.nextEpisode) {
            mutations.forEach(content.clickNextEpisodeButton);
          }
          if (data.skipRecap) {
            mutations.forEach(content.clickSkipRecapButton);
          }
        },
      );
    });
    observer.observe(document, { childList: true, subtree: true });
  },
};

content.observeDOM();

export default content;
