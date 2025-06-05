import { jest } from '@jest/globals';
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/ban-types, @typescript-eslint/no-this-alias */

const createMutation = () => {
  const container = document.createElement('div');
  const child = document.createElement('div');
  container.appendChild(child);
  return { addedNodes: container.childNodes } as unknown as MutationRecord;
};

describe('content module', () => {
  let originalMutationObserver: typeof MutationObserver | undefined;

  beforeEach(() => {
    jest.resetModules();
    (global as any).chrome = { storage: { sync: { get: jest.fn() } } };
    (global as any).window ||= {};
    (global as any).window.chrome = (global as any).chrome;
    originalMutationObserver = global.MutationObserver;
    global.MutationObserver = class {
      observe() {}
      disconnect() {}
      constructor() {}
    } as any;
    document.documentElement.setAttribute('lang', 'ja');
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete (global as any).chrome;
    if ((global as any).window) {
      delete (global as any).window.chrome;
    }
    global.MutationObserver = originalMutationObserver as any;
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('lang');
  });

  test('clickSkipButton clicks the skip intro button if present', async () => {
    let content: any;
    jest.isolateModules(() => {
      content = require('./content').default;
    });

    const button = document.createElement('button');
    button.textContent = 'イントロをスキップ';
    const clickMock = jest.fn();
    button.addEventListener('click', clickMock);
    document.body.appendChild(button);

    const mutation = createMutation();
    content.clickSkipButton(mutation);

    expect(clickMock).toHaveBeenCalled();
  });

  test('clickNextEpisodeButton clicks the next episode button if present', async () => {
    let content: any;
    jest.isolateModules(() => {
      content = require('./content').default;
    });

    const button = document.createElement('button');
    button.textContent = '次のエピソード';
    const clickMock = jest.fn();
    button.addEventListener('click', clickMock);
    document.body.appendChild(button);

    const mutation = createMutation();
    content.clickNextEpisodeButton(mutation);

    expect(clickMock).toHaveBeenCalled();
  });

  test('observeDOM sets up observer and triggers click functions', () => {
    const getMock = jest.fn((_keys: string[], cb: Function) => {
      cb({ skipIntro: true, nextEpisode: true });
    });
    (global as any).chrome.storage.sync.get = getMock;

    let callback!: MutationCallback;
    let observerInstance: any;
    class MockObserver {
      observe = jest.fn();
      disconnect = jest.fn();
      constructor(cb: MutationCallback) {
        callback = cb;
        observerInstance = this;
      }
    }
    global.MutationObserver = MockObserver as any;

    let content: any;
    jest.isolateModules(() => {
      content = require('./content').default;
    });

    jest.spyOn(content, 'clickSkipButton');
    jest.spyOn(content, 'clickNextEpisodeButton');

    expect(observerInstance.observe).toHaveBeenCalledWith(document, {
      childList: true,
      subtree: true,
    });

    const mutation = createMutation();
    callback([mutation], observerInstance as unknown as MutationObserver);

    expect(getMock).toHaveBeenCalledWith(
      ['skipIntro', 'nextEpisode'],
      expect.any(Function),
    );
    expect(content.clickSkipButton).toHaveBeenCalledWith(mutation, 0, [mutation]);
    expect(content.clickNextEpisodeButton).toHaveBeenCalledWith(mutation, 0, [mutation]);
  });

  test('functions handle missing mutation or buttons gracefully', () => {
    let content: any;
    jest.isolateModules(() => {
      content = require('./content').default;
    });

    const evaluateSpy = jest.spyOn(document, 'evaluate').mockReturnValue({ singleNodeValue: null } as any);

    expect(() => content.clickSkipButton(null)).not.toThrow();
    expect(() => content.clickNextEpisodeButton({ addedNodes: [] } as any)).not.toThrow();

    const mutation = createMutation();
    content.clickSkipButton(mutation);
    content.clickNextEpisodeButton(mutation);

    expect(evaluateSpy).toHaveBeenCalled();
    evaluateSpy.mockRestore();
  });

  test('falls back to English labels when lang is unknown', () => {
    document.documentElement.setAttribute('lang', 'zz');

    let content: any;
    jest.isolateModules(() => {
      content = require('./content').default;
    });

    const button = document.createElement('button');
    button.textContent = 'Skip Intro';
    const clickMock = jest.fn();
    button.addEventListener('click', clickMock);
    document.body.appendChild(button);

    const mutation = createMutation();
    content.clickSkipButton(mutation);

    expect(clickMock).toHaveBeenCalled();
  });

  test('defaults to English when no lang attribute present', () => {
    document.documentElement.removeAttribute('lang');

    let content: any;
    jest.isolateModules(() => {
      content = require('./content').default;
    });

    const button = document.createElement('button');
    button.textContent = 'Skip Intro';
    const clickMock = jest.fn();
    button.addEventListener('click', clickMock);
    document.body.appendChild(button);

    const mutation = createMutation();
    content.clickSkipButton(mutation);

    expect(clickMock).toHaveBeenCalled();
  });
});
