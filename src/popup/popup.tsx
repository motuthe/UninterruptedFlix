import React, { useEffect } from 'react';
import logo from '../images/logo.png';
import skip from '../images/skip-intro.png';
import '../scss/popup.scss';
import { PopupInterface } from './types';

const popup: PopupInterface = {
  setCheckboxState: (checkbox: HTMLInputElement | null) => {
    chrome.storage.sync.get('skipIntro', (data: { skipIntro?: boolean }) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      if (checkbox) {
        checkbox.checked = data.skipIntro ?? false;
      }
    });
  },
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    chrome.storage.sync.set({ skipIntro: target.checked });
  },
};

function Popup() {
  useEffect(() => {
    const checkbox = document.getElementById('toggleSwitch') as HTMLInputElement | null;
    if (checkbox) {
      popup.setCheckboxState(checkbox);
    }
  }, []);

  return (
    <>
      <img src={logo} className="logo" alt="UninterruptedFlix Logo" />
      <form>
        <label>
          <img src={skip} className="skip-intro-logo" alt="Skip Intro Logo" />
          <input type="checkbox" id="toggleSwitch" onChange={popup.handleCheckboxChange} />
        </label>
      </form>
    </>
  );
}

export default Popup;
