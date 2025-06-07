export type MutationType = MutationRecord | null;

export interface ContentInterface {
  clickNextEpisodeButton: (mutation: MutationType) => void;
  clickSkipButton: (mutation: MutationType) => void;
  clickSkipRecapButton: (mutation: MutationType) => void;
  observeDOM: () => void;
}
