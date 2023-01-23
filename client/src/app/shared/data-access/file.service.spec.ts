import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileService } from './file.service';
import { HttpParams } from '@angular/common/http';

describe('FileService', () => {
  let service: FileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(FileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return all files', () => {
    const mockResponse = {
      data: [],
      total: 0
    };
    service.getAllFiles().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    httpMock.expectOne(`${service.baseApiUrl}/api/files/getAllDirectoryContents?page=1&pageSize=2`).flush(mockResponse);
  });
});
