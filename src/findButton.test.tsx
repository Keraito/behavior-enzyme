import React, { useState } from 'react';
import { mount } from 'enzyme';
import { findButton, findButtonByText, clickElement } from '.';

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
    const component = mount(<SomeElement />);
    const returnedWrapper = findButton(component);
  });

  test('should correctly find the single button in a simple React component', () => {
    const DummyElement = () => (
      <div>
        <button>Some dummy text</button>
      </div>
    );
    const component = mount(<DummyElement />);
    expect(findButton(component)).toHaveLength(1);
    expect(findButton(component).text()).toBe('Some dummy text');
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
    const component = mount(<DummyElement />);
    const buttonsWithButtonText = findButtonByText(component, 'button');
    expect(buttonsWithButtonText).toHaveLength(2);
    expect(buttonsWithButtonText.map(x => x.text())).toEqual([
      'button text',
      'anoter button text',
    ]);
  });

  test('should click properly', () => {
    const component = mount(<TextToggler />);
    expect(component.text()).toContain(closedText);
    const toggleButton = findButtonByText(component, 'toggle');
    expect(toggleButton).toHaveLength(1);
    clickElement(toggleButton);
    expect(component.text()).not.toContain(closedText);
    expect(component.text()).toContain(openText);
  });
});
