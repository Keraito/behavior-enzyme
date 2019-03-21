import React from 'react';
import { wrap } from '.';
import { ReactWrapper, mount } from 'enzyme';
import { disconnect } from 'cluster';

const SimpleElement = () => <div />;

const propDeprecationWarning = (func: string) => `
        Attempted to access ReactWrapper::${func}, which was previously a private property on
        Enzyme ReactWrapper instances, but is no longer and should not be relied upon.`;

describe('The Enzyme behavior wrapper', () => {
  test('should extend upon the React Wrapper API', () => {
    const reactWrapperComponent = mount(<SimpleElement />);
    const behaviorWrapperComponent = wrap(reactWrapperComponent);
    const rwKeys = Object.getOwnPropertyNames(
      Object.getPrototypeOf(reactWrapperComponent)
    );
    expect(rwKeys).not.toHaveLength(0);

    const bwPrototypeKeys = Object.getOwnPropertyNames(
      Object.getPrototypeOf(behaviorWrapperComponent)
    );
    const bwPropertyKeys = Object.getOwnPropertyNames(behaviorWrapperComponent);
    const bwKeys = [...bwPrototypeKeys, ...bwPropertyKeys];
    expect(bwKeys).not.toHaveLength(0);
    expect(bwKeys).not.toEqual(rwKeys);
    expect(bwKeys).toEqual(expect.arrayContaining(rwKeys));
  });

  describe('should retain all of the functions of a React Wrapper', () => {
    const reactWrapperComponent = mount(<SimpleElement />);
    const behaviorWrapperComponent = wrap(reactWrapperComponent);
    const rwKeys = Object.getOwnPropertyNames(
      Object.getPrototypeOf(reactWrapperComponent)
    );

    rwKeys.forEach(key => {
      test(`${key}`, () => {
        try {
          expect(behaviorWrapperComponent[key]).toBeTruthy();
        } catch (e) {
          const message: string = e.message;
          expect(message.includes(propDeprecationWarning(key))).toBe(true);
        }
      });
    });
  });
});
