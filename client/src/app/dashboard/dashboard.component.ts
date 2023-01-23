import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/data-access/file.service';
import { Observable } from 'rxjs';
import { File, FileResponse } from '../shared/models/file';
import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { SizeUnitPipe } from '../shared/utils/pipes/size-unit.pipe';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [HttpClientModule, CommonModule, SizeUnitPipe],
  providers: [FileService],
  standalone: true
})
export class DashboardComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  selectedFile = new BehaviorSubject<File>({
    name: "",
    type: "",
    size: 0,
    createdDate: "",
    fullPath: ""
  });
  selectedFile$ = this.selectedFile.asObservable();

  folderStack: string[] = [];
  currentPage: number = 1;
  numberOfRecords: number = 5;
  showDropdown = false;
  files$: Observable<FileResponse> = this.getAllFiles();

  constructor(public fileService: FileService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getAllFiles(currentPage = 1, numberOfRecords = 5): Observable<FileResponse> {
    return this.fileService.getAllFiles(currentPage, numberOfRecords).pipe(shareReplay(1), takeUntil(this.unsubscribe));
  }

  private resetPages(): void {
    this.currentPage = 1;
  }

  private updateFiles(): void {
    if (this.folderStack.length === 0) {
      this.files$ = this.getAllFiles(this.currentPage, this.numberOfRecords);
      return;
    };

    this.files$ = this.fileService.getDirectoryContent(this.folderStack[this.folderStack.length - 1], this.currentPage, this.numberOfRecords).pipe(shareReplay(1), takeUntil(this.unsubscribe));
  }

  nextPage(): void {
    this.currentPage++;
    this.updateFiles();
  }

  previousPage(): void {
    this.currentPage--;
    this.updateFiles();
  }

  isFileTypeSelectable(file: File): boolean {
    return file.type.toLowerCase() === 'directory';
  }

  getDirectoryDetails(file: File): void {
    this.resetPages();
    this.folderStack.push(file?.fullPath);
    this.updateFiles();
  }

  goBack(): void {
    if (this.currentPage > this.getTotalPages(this.numberOfRecords)) {
      this.currentPage = 1;
    }
    this.folderStack.pop();
    this.updateFiles();
  }

  getTotalPages(totalRecords: number): number {
    return Math.ceil(totalRecords / this.numberOfRecords);
  }

  selectNumberOfRecords(numberOfRecords: number): void {
    this.numberOfRecords = numberOfRecords;
    this.resetPages();
    this.updateFiles();
    this.showDropdown = false;
  }
}
