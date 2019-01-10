import { ToRuntimeStringPipe } from './to-runtime-string.pipe';

describe('ToRuntimeStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ToRuntimeStringPipe();
    expect(pipe).toBeTruthy();
  });
});
