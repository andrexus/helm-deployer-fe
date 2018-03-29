import { TestBed, async, inject } from '@angular/core/testing';

import { OnOfflineDatabaseOnlyGuard } from './on-offline-database-only.guard';

describe('OnOfflineDatabaseOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnOfflineDatabaseOnlyGuard]
    });
  });

  it('should ...', inject([OnOfflineDatabaseOnlyGuard], (guard: OnOfflineDatabaseOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
