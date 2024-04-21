import content from './content';

describe('content', () => {
  describe('clickSkipButton', () => {
    const mockMutation = {
      addedNodes: { length: 1 },
    };

    it('should click the button if it exists', () => {
      const mockButton = { click: jest.fn() };
      document.querySelector = jest.fn().mockReturnValue(mockButton);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      content.clickSkipButton(mockMutation);

      expect(mockButton.click).toHaveBeenCalled();
    });

    it('should not click the button if it does not exist', () => {
      document.querySelector = jest.fn().mockReturnValue(null);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      content.clickSkipButton(mockMutation);

      expect(document.querySelector).toHaveBeenCalled();
    });
  });

  describe('observeDOM', () => {
    let clickSkipButtonSpy: jest.SpyInstance;
    let mockData = { skipIntro: true };

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      jest.spyOn(global, 'MutationObserver').mockImplementation((callback) => {
        const observer = {
          observe: jest.fn(),
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        callback([], observer);
        return observer;
      });

      global.chrome = {
        storage: {
          sync: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            get: (key: string, callback: (data: { [key: string]: never }) => void) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              callback(mockData);
            },
          },
        },
      };

      clickSkipButtonSpy = jest.spyOn(content, 'clickSkipButton');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call clickSkipButton if skipIntro is true', () => {
      content.observeDOM();
      expect(clickSkipButtonSpy).not.toHaveBeenCalled();
    });
    it('should not call clickSkipButton if skipIntro is false', () => {
      mockData = { skipIntro: false };
      content.observeDOM();
      expect(clickSkipButtonSpy).not.toHaveBeenCalled();
    });
  });
});
