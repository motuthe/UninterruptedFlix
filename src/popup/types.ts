import React from 'react';

export interface PopupInterface {
  setCheckboxState: (checkbox: HTMLInputElement | null) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
