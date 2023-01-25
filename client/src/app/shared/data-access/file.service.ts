import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FileResponse } from '../models/file';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FileService {
  baseApiUrl: string = environment.apiBaseUrl;

  constructor( private http: HttpClient) { }

  getAllFiles(page = 1, pageSize = 2): Observable<FileResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<FileResponse>(`${this.baseApiUrl}/api/files/getAllDirectoryContents`, { params }).pipe(
      catchError(error => {
        console.error(error);
        return of({ data: [], total: 0 });
      })
    );
  }

  getDirectoryContent(directoryPath: string, page = 1, pageSize = 2): Observable<FileResponse> {
    const params = new HttpParams()
      .set('directoryPath', directoryPath)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<FileResponse>(`${this.baseApiUrl}/api/files/getDirectoryContent`, { params });
  }

}
