export type MutationType = MutationRecord | null;

export interface ContentInterface {
  clickSkipButton: (mutation: MutationType) => void;
  observeDOM: () => void;
}