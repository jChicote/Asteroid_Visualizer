
import { sum } from '../../javascript/shared/DepedencyInjectionServices/ServiceProvider.js';

//const sum = require('../../javascript/shared/DepedencyInjectionServices/ServiceProvider.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});