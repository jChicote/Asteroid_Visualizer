
import { ServiceProvider, sum } from '../../javascript/shared/DepedencyInjectionServices/ServiceProvider.js';
import { ServiceContainer } from '../../javascript/shared/DepedencyInjectionServices/ServiceContainer.js';
import {jest} from '@jest/globals';

// class TestClass {}

// class MockedClassConsumer {
//   constructor() {
//     this.mockedClassInstance = new ServiceContainer();
//     this.mockedClassInstance.Resolve(TestClass);
//   }
// }

// jest.mock('../../javascript/shared/DepedencyInjectionServices/ServiceContainer.js', () => {
//   const mockServiceContainer = jest.fn().mockImplementation(() => {
//     return {
//       Resolve: jest.fn((parameter) => new Object())
//     };
//   });
//   return mockServiceContainer;
// });

// jest.mock()

// it('The MockedContainer instance can be created', () => {
//   const mockedContainer = new ServiceContainer();
//   // console.log(MockedClass()); // logs a jest-created object with a mockedMethod: property, because the mockImplementation has been set now.
//   expect(mockedContainer).toBeTruthy();
// });

// it('We can check if the consumer called a method on the class instance', () => {
//   const mockedProvider = new ServiceProvider(new ServiceContainer());
//   mockedProvider.GetService(TestClass);
//   expect(mockedProvider.GetService).toHaveBeenCalled(); 
// // Checking for method call using the stored reference to the mock function
// // It would be nice if there were a way to do this directly from MockedClass.mock
// });

test('adds 1 + 2 to equal 3', () => {
  // Arrange

  // Act

  // Assert
  expect(sum(1, 2)).toBe(3);
});

beforeEach(() => {
  jest.resetModules();
});
