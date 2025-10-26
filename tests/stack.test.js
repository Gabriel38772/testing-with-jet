const stack = require('../src/stack');

beforeEach(() => {
  // töm stacken innan varje test
  while (stack.pop() !== undefined) {}
});

test('peek on empty stack returns undefined', () => {
  expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
  stack.push(1);
  expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
  stack.push("wow");
  stack.push(42);
  expect(stack.peek()).toBe(42);
});

// 🔹 Eget test
test('pop on empty stack should return undefined', () => {
  expect(stack.pop()).toBeUndefined();
});
