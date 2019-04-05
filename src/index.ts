import { ReactWrapper } from 'enzyme';

/**
 * @returns A `ReactWrapper` object of all the buttons in the original wrapper.
 */
export const findButton = (wrapper: ReactWrapper) => wrapper.find('button');

/**
 * Find all the buttons that contain the `text` string.
 * @param text The text content to search on.
 */
export const findButtonByText = (wrapper: ReactWrapper, text: string) =>
  wrapper.findWhere(node => node.text().includes(text)).filter('button');

export const clickElement = (wrapper: ReactWrapper) => wrapper.simulate('click');
