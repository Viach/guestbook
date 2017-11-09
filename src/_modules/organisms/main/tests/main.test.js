'use strict';

import Main from '../main';

describe('Main View', function() {

  beforeEach(() => {
    this.main = new Main();
  });

  it('Should run a few assertions', () => {
    expect(this.main);
  });

});
