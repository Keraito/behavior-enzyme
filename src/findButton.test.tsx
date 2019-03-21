import React, { useState } from 'react';
import { mount } from 'enzyme';
import { findButton, wrap } from '.';
import { BehaviorReactWrapper } from './index';

const openText = 'open';
const closedText = 'closed';
const TextToggler = () => {
  const [showOpenText, setShowOpenText] = useState(false);
  return (
    <div>
      {showOpenText ? openText : closedText}
      <button onClick={() => setShowOpenText(!showOpenText)}>
        toggle text
      </button>
      <button>another button</button>
    </div>
  );
};

describe('The FindButton function', () => {
  test.skip('should return a BehaviorReactWrapper object', () => {
    const SomeElement = () => <div />;
    const component = wrap(mount(<SomeElement />));
    const returnedWrapper = component.findButton();
  });

  test('should correctly find the single button in a simple React component', () => {
    const DummyElement = () => (
      <div>
        <button>Some dummy text</button>
      </div>
    );
    const component = wrap(mount(<DummyElement />));
    expect(component.findButton()).toHaveLength(1);
    expect(component.findButton().text()).toBe('Some dummy text');
  });
});

describe('The FindButtonByText function', () => {
  test('should find all elements', () => {
    const DummyElement = () => (
      <div>
        <button>button text</button>
        <button>anoter button text</button>
        <button>some weird text</button>
      </div>
    );
    const component = wrap(mount(<DummyElement />));
    const buttonsWithButtonText = component.findButtonByText('button');
    expect(buttonsWithButtonText).toHaveLength(2);
    expect(buttonsWithButtonText.map(x => x.text())).toEqual([
      'button text',
      'anoter button text',
    ]);
  });

  test('should click properly', () => {
    const component = wrap(mount(<TextToggler />));
    expect(component.text()).toContain(closedText);
    const toggleButton = component.findButtonByText('toggle');
    console.log(Object.getPrototypeOf(toggleButton));
    expect(toggleButton).toHaveLength(1);
    toggleButton.clickElement();
    expect(component.text()).toContain(closedText);
    expect(component.text).toContain(openText);
  });
});
