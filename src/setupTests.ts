import { jest } from '@jest/globals';

// Глобальный мок для window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    assign: jest.fn(),
    replace: jest.fn(),
  },
  writable: true,
});

// Мок для history API
Object.defineProperty(window, 'history', {
  value: {
    pushState: jest.fn(),
    replaceState: jest.fn(),
  },
  writable: true,
});
