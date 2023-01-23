import { DashboardComponent } from './dashboard.component';
import { FileService } from '../shared/data-access/file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let fileService: FileService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardComponent],
      providers: [FileService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fileService = TestBed.get(FileService);
    fixture.detectChanges();
    component.folderStack = ['path1', 'path2'];
    component.currentPage = 2;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextPage() and increase the currentPage by 1', () => {
    component.nextPage();
    expect(component.currentPage).toBe(3);
  });

  it('should call previousPage() and decrease the currentPage by 1', () => {
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should set currentPage to 1 if it is greater than the total number of pages', () => {
    spyOn(component, 'getTotalPages').and.returnValue(1);
    component.goBack();
    expect(component.currentPage).toBe(1);
  });

  it('should not change currentPage if it is less than or equal to the total number of pages', () => {
    spyOn(component, 'getTotalPages').and.returnValue(2);
    component.goBack();
    expect(component.currentPage).toBe(2);
  });

  it('should remove the last item from the folder stack', () => {
    component.goBack();
    expect(component.folderStack).toEqual(['path1']);
  });
});
