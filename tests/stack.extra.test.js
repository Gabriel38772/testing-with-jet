const stack = require('../src/stack');

beforeEach(() => {
  // töm stacken
  while (typeof stack.pop() !== 'undefined') {}
});

test('peek is idempotent and pop returns same as previous peek', () => {
  stack.push('A');
  stack.push('B');
  expect(stack.peek()).toBe('B');
  expect(stack.peek()).toBe('B'); // samma igen
  expect(stack.pop()).toBe('B');  // pop matchar peek
  expect(stack.peek()).toBe('A');
});