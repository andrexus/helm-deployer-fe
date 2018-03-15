import { Injectable } from '@angular/core';
import { BaseDTO } from './base.dto';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {flatMap, filter, first} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class OfflineDatabaseService {

  private db: IDBDatabase;

  private ready = new BehaviorSubject<boolean>(false);

  constructor() {
    const request = window.indexedDB.open('offline-db', environment.offlineDatabaseVersion);

    request.onerror = () => {
      throw new Error('Cannot open indexedDB');
    };

    request.onsuccess = (event) => {
      this.db = (<any>event.target).result;
      this.ready.next(true);
    };

    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (<any>event.target).result;

      console.log(environment.offlineStores);

      environment
        .offlineStores
        .filter(store => !db.objectStoreNames.contains(store))
        .forEach(store => db.createObjectStore(store, { keyPath: 'id' }));
    };
  }

  list(storeName: string) {
    return this.ready.pipe(
      filter(ready => ready),
      flatMap(() => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        return Observable.create(observer => {
          const result = [];

          store.openCursor().onsuccess = (event) => {
            const cursor: any = (<any>event.target).result;

            if (cursor) {
              result.push(cursor.value);
              cursor.continue();
            } else {
              observer.next(result);
              observer.complete();
            }
          };
        });
      }),
    );
  }

  get(storeName: string, id: string): Observable<BaseDTO> {
    return this.apply(storeName, store => store.get(id));
  }

  add(storeName: string, data: BaseDTO) {
    return this.apply(storeName, store => store.add({ ...data, id: this.generateId() }));
  }

  put(storeName: string, data: BaseDTO) {
    return this.apply(storeName, store => store.put({ ...data }));
  }

  delete(storeName: string, id: string) {
    return this.apply(storeName, store => store.delete(id));
  }

  private generateId() {
    function generate(m = Math, d = Date, h = 16, s = ss => m.floor(ss).toString(h)) {
      return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    }

    return generate();
  }

  private apply(storeName: string, requestFactory: (store: IDBObjectStore) => IDBRequest) {
    return this.ready.pipe(
      filter(ready => ready),
      flatMap(() => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        return Observable.create(observer => {
          const request = requestFactory(store);

          transaction.oncomplete = () => {
            observer.next(request.result);
            observer.complete();
          };

          transaction.onerror = () => observer.error(new Error('Error while reading'));
        });
      }),
      first()
    );
  }

}
