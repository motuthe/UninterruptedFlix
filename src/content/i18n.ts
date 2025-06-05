export const LANGUAGE_LABELS = {
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

export type LangCode = keyof typeof LANGUAGE_LABELS;

const DEFAULT_LANG: LangCode = 'en';

export const getLangCode = (): LangCode => {
  const html = document.documentElement;
  const langAttr = html.getAttribute('lang')?.toLowerCase() ?? '';
  const match = (Object.keys(LANGUAGE_LABELS) as LangCode[]).find((code) =>
    langAttr.startsWith(code),
  );
  return match || DEFAULT_LANG;
};

export const getLabels = () => LANGUAGE_LABELS[getLangCode()];

export const buildXPath = (label: string) => `//button[contains(.,'${label}')]`;
