import { ReactWrapper } from 'enzyme';

export const findButton = (wrapper: ReactWrapper) => wrapper.find('button');

export const findButtonByText = (wrapper: ReactWrapper, text: string) =>
  wrapper.findWhere(node => node.text().includes(text)).filter('button');

export const click = (wrapper: ReactWrapper) => wrapper.simulate('click');

const behaviorFunctions = [findButton, findButtonByText, click];

interface BehaviorReactWrapper extends ReactWrapper {
  /**
   * Index signature to satsify TypeScript's requirements.
   * Every property of the ReactWrapper and this wrapper around it
   * should only contain string keys mapped onto functions. The only
   * exception is the `length` property of the ReactWrapper.
   */
  [key: string]: Function | number;
  /**
   * @returns A `ReactWrapper` object of all the buttons in the original wrapper.
   */
  findButton(): BehaviorReactWrapper;
  /**
   * Find all the buttons that contain the `text` string.
   * @param text The text content to search on.
   */
  findButtonByText(text: string): BehaviorReactWrapper;
  /**
   * Click the element.
   */
  clickElement(): BehaviorReactWrapper;
}

/**
 * Main API of this module. Wraps an incoming `ReactWrapper` object mounted with Enzyme with a more
 * intuitive and behavior testing focused API to enable developers to focus on properly testing their
 * React components. It doesn't alter any of the existing `ReactWrapper` API and preserves backwards compatibility
 * with it by *extending* upon it, rather than replacing it.
 * @param wrapper A `ReactWrapper` object mounted with Enzyme.
 */
export const wrap = (wrapper: ReactWrapper): BehaviorReactWrapper => {
  const newWrapper: BehaviorReactWrapper = Object.defineProperties(wrapper, {
    findButton: {
      value: () => findButton(wrapper),
    },
    findButtonByText: {
      value: (text: string) => findButtonByText(wrapper, text),
    },
    clickElement: {
      value: () => click(wrapper),
    },
  });

  const keys = [
    ...Object.getOwnPropertyNames(Object.getPrototypeOf(wrapper)),
    ...Object.getOwnPropertyNames(wrapper),
  ];
  keys.forEach(key => {
    try {
      newWrapper[key] = newWrapper[key].bind(newWrapper);
    } catch (e) {}
  });
  return newWrapper;
};
