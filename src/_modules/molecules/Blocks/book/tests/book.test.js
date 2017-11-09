'use strict';

import Book from '../book';

describe('Book View', function() {

  beforeEach(() => {
    this.book = new Book();
  });

  it('Should run a few assertions', () => {
    expect(this.book);
  });

});
