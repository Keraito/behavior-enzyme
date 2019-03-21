import { ReactWrapper } from 'enzyme';

export const findButton = (wrapper: ReactWrapper) => wrapper.find('button');
export const findButtonByText = (
  wrapper: ReactWrapper,
  text: string
): ReactWrapper =>
  wrapper.findWhere(node => node.text().includes(text)).filter('button');

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
  findButton(): ReactWrapper;
  /**
   * Find all the buttons that contain the `text` string.
   * @param text The text content to search on.
   */
  findButtonByText(text: string): ReactWrapper;
}

export const wrap = (wrapper: ReactWrapper): BehaviorReactWrapper => {
  const newWrapper = Object.defineProperties(wrapper, {
    findButton: {
      value: () => findButton(wrapper),
    },
    findButtonByText: {
      value: (text: string) => findButtonByText(wrapper, text),
    },
  });
  return newWrapper;
};
