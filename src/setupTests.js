// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver for tests that might need it
global.IntersectionObserver = class IntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock window.alert and window.confirm for tests
global.alert = jest.fn();
global.confirm = jest.fn(() => true);

// Clean up between tests
afterEach(() => {
  jest.clearAllMocks();
});
