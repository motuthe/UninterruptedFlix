import { useEffect, useState } from 'react';

// Custom React hook to manage checkbox state that persists in Chrome storage.

const useCheckboxState = (storageKey: string) => {
  const [isChecked, setIsChecked] = useState(false);

  // Load the saved value from chrome.storage when the component mounts.

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
    // Persist the new checkbox value and update local state.
    const checked = event.target.checked;
    chrome.storage.sync.set({ [storageKey]: checked });
    setIsChecked(checked);
  };

  // Expose the checkbox state and handler to the component using this hook.
  return { isChecked, handleCheckboxChange };
};

export default useCheckboxState;
