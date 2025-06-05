import { ContentInterface, MutationType } from '../types/all.ts';

const LANGUAGE_LABELS = {
  en: { skipIntro: 'Skip Intro', nextEpisode: 'Next Episode' },
  ja: { skipIntro: 'イントロをスキップ', nextEpisode: '次のエピソード' },
  es: { skipIntro: 'Saltar introducción', nextEpisode: 'Siguiente episodio' },
  fr: { skipIntro: "Passer l'intro", nextEpisode: 'Épisode suivant' },
  de: { skipIntro: 'Intro überspringen', nextEpisode: 'Nächste Folge' },
  it: { skipIntro: "Salta l'intro", nextEpisode: 'Prossimo episodio' },
  pt: { skipIntro: 'Pular introdução', nextEpisode: 'Próximo episódio' },
  ru: { skipIntro: 'Пропустить заставку', nextEpisode: 'Следующая серия' },
  zh: { skipIntro: '跳过片头', nextEpisode: '下一集' },
  ko: { skipIntro: '인트로 건너뛰기', nextEpisode: '다음 화' },
  ar: { skipIntro: 'تخطي المقدمة', nextEpisode: 'الحلقة التالية' },
} as const;

type LangCode = keyof typeof LANGUAGE_LABELS;

const DEFAULT_LANG: LangCode = 'en';

const getLangCode = (): LangCode => {
  const html = document.documentElement;
  const langAttr = html.getAttribute('lang')?.toLowerCase() ?? '';
  const match = Object.keys(LANGUAGE_LABELS).find((code) => langAttr.startsWith(code));
  return (match as LangCode) || DEFAULT_LANG;
};

const getLabels = () => LANGUAGE_LABELS[getLangCode()];

const buildXPath = (label: string) => `//button[contains(.,'${label}')]`;

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
