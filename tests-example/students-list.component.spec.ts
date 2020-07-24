import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatIconModule, MatTableModule } from '@angular/material';

import { StudentsListComponent } from './students-list.component';
import { StudentsService } from '~/app/core/data';
import { MockDataClass } from '~/app/classes/testing/mock-data.class';

describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentsListComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create StudentsListComponent', () => {
    expect(component).toBeDefined();
  });

  it(`should render page title and equal 'Students'`, () => {
    expect(fixture.debugElement.nativeElement.querySelector('.page__title')).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('.page__title').textContent).toEqual('Students');
  });

  it(`should contain Create New Student button`, () => {
    expect(fixture.debugElement.nativeElement.querySelector('.btn--create')).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('.btn--create').textContent).toEqual('Create new student');
  });

  it(`should redirect to 'students/create' on 'Create new student' click`, () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const linkIndex = links.findIndex(link => link.properties.href === '/students/create');

    expect(linkIndex).toBeGreaterThan(-1);
  });

  it(`should fetch students when component init`, fakeAsync(() => {
    const studentsService = TestBed.inject(StudentsService);
    const spyOnFetch = spyOn(studentsService, 'studentsSearch').and.returnValue(MockDataClass.studentsObservable);

    component.ngOnInit();
    fixture.detectChanges();
    tick();

    expect(spyOnFetch).toHaveBeenCalled();
    expect(component.students.length).toBe(2);
  }));

  it('should destroy all observables after the component is destroyed', () => {
    component.ngOnDestroy();

    expect(component.isObservablesAlive).toBeFalsy();
  });
});
