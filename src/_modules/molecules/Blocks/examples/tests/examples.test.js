'use strict';

import Examples from '../examples';

describe('Examples View', function() {

  beforeEach(() => {
    this.examples = new Examples();
  });

  it('Should run a few assertions', () => {
    expect(this.examples);
  });

});
