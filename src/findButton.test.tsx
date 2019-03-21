import React from 'react';
import { mount } from 'enzyme';
import { findButton, wrap } from '.';

describe('The FindButton function', () => {
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
    const component = wrap(mount(<DummyElement />));
    const buttonsWithButtonText = component.findButtonByText('button');
    expect(buttonsWithButtonText).toHaveLength(2);
    expect(buttonsWithButtonText.map(x => x.text())).toEqual([
      'button text',
      'anoter button text',
    ]);
  });
});
