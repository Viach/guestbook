'use strict';

import SectionBook from '../section-book';

describe('SectionBook View', function() {

  beforeEach(() => {
    this.sectionBook = new SectionBook();
  });

  it('Should run a few assertions', () => {
    expect(this.sectionBook);
  });

});
