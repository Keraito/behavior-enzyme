import React from 'react';
import { mount } from 'enzyme';
import { findButton } from '.';

const DummyElement = () => (
  <div>
    <button>Some dummy text</button>
  </div>
);

describe('The Enzyme wrapper', () => {
  test('should do something', () => {
    expect(2 + 2).toBe(4);
  });
  test('should find the correct button', () => {
    const component = mount(
      <div>
        <button />
      </div>
    );
    expect(findButton(component)).toHaveLength(1);
  });
});
