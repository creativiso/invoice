// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { IProform, IProformItem } from '../../../../../libs/typings/src/index';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProformsService {
//   constructor(private http: HttpClient) {}

//   createProform(dataProform: IProform): Observable<IProform> {
//     return this.http.post<IProform>(
//       'http://localhost:3333/api/v1/proforms/add',
//       dataProform
//     );
//   }

//   createProformItem(dataProformItems: IProformItem): Observable<IProformItem> {
//     return this.http.post<IProformItem>(
//       `http://localhost:3333/api/v1/proformitems/:${dataProformItems}/items`,
//       dataProformItems
//     );
//   }
//   getProform(proformId: number): Observable<IProform> {
//     return this.http.get<IProform>(
//       `http://localhost:3333/api/v1/proforms/${proformId}`
//     );
//   }
//   getProformItem(itemId: number): Observable<IProformItem> {
//     return this.http.get<IProformItem>(
//       `http://localhost:3333/api/v1/proformitems/${itemId}`
//     );
//   }
//   updateProformItem(
//     itemId: number,
//     dataProformItem: IProformItem
//   ): Observable<IProformItem> {
//     return this.http.put<IProformItem>(
//       `http://localhost:3333/api/v1/proformitems/${itemId}`,
//       dataProformItem
//     );
//   }
//   updateProform(
//     proformId: number,
//     updatedProformData: IProform
//   ): Observable<IProform> {
//     return this.http.put<IProform>(
//       `http://localhost:3333/api/v1/proforms/${proformId}`,
//       updatedProformData
//     );
//   }
// }
