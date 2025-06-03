import { useEffect, useState } from 'react';

const useCheckboxState = (storageKey: string) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(storageKey, (data: { [key: string]: boolean }) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      setIsChecked(data[storageKey] ?? false);
    });
  }, [storageKey]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    chrome.storage.sync.set({ [storageKey]: checked });
    setIsChecked(checked);
  };

  return { isChecked, handleCheckboxChange };
};

export default useCheckboxState;
