import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ClassDetailComponent } from './class-detail.component';
import { ClassroomInterface } from '~/app/interfaces/classroom.interface';
import { ActivatedRouteClassroomStubClass } from '~/app/classes/testing/activated-route-stub/activated-route-classroom.stub.class';
import { ClassesService } from '~/app/core/data';

describe('ClassDetailComponent', () => {
  let component: ClassDetailComponent;
  let fixture: ComponentFixture<ClassDetailComponent>;
  let activeRoute: ActivatedRoute;
  let classesService: ClassesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClassDetailComponent
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
      ],
      providers: [
        ClassesService,
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteClassroomStubClass
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDetailComponent);
    component = fixture.componentInstance;
    activeRoute = TestBed.inject(ActivatedRoute);
    classesService = TestBed.inject(ClassesService);

    fixture.detectChanges();
  });

  it('should define ClassDetailComponent', () => {
    expect(component).toBeDefined();
  });

  it(`should render page title 'Create class' if Create mode`, () => {
    expect(fixture.debugElement.nativeElement.querySelector('.page__title').textContent).toEqual('Create class');
  });

  it(`should render page title 'Edit class {classTitle}' if Edit mode`, () => {
    activeRoute.data.subscribe((classroom: ClassroomInterface) => {
      component.classRoomModel = classroom;
    });

    component.pageTitle = `Edit class ${component.classRoomModel.title}`;
    const $pageTitle = fixture.debugElement.nativeElement.querySelector('.page__title');

    fixture.detectChanges();

    expect($pageTitle.textContent).toContain(`Edit class ${component.classRoomModel.title}`);
  });

  it(`should redirect to 'classes' when click back button or cancel link`, () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const linkIndex = links.findIndex(link => link.properties.href === '/classes');

    expect(linkIndex).toBeGreaterThan(-1);
  });

  it(`should enable form and switch page mode to 'Create' if ActiveRoute has no data`, () => {
    expect(component.isEditMode).toBeFalsy();
    expect(component.form.disabled).toBeFalsy();
  });

  it(`should disable form and switch page mode to Edit if ActiveRoute has data`, () => {
    activeRoute.data.subscribe((classroom: ClassroomInterface) => {
      component.classRoomModel = classroom;
      component.isEditMode = true;
      component.changeFormState(false);
    });

    expect(component.isEditMode).toBeTruthy();
    expect(component.form.disabled).toBeTruthy();
  });

  it('should contain form with next controls', () => {
    expect(component.form.contains('label')).toBeTruthy();
    expect(component.form.contains('grade')).toBeTruthy();
    expect(component.form.contains('responsibleTeaches')).toBeTruthy();
  });

  it(`should patch form if 'Edit mode'`, () => {
    activeRoute.data.subscribe((classroom: ClassroomInterface) => {
      component.classRoomModel = classroom;
    });

    component.form.patchValue({
      label: component.classRoomModel.title,
      grade: component.classRoomModel.grade,
      responsibleTeaches: component.classRoomModel.responsibleTeaches
    });

    expect(component.form.get('label').value).toEqual(component.classRoomModel.title);
    expect(component.form.get('grade').value).toEqual(component.classRoomModel.grade);
    expect(component.form.get('responsibleTeaches').value).toEqual(component.classRoomModel.responsibleTeaches);
  });

  it(`should show buttons 'Save' and 'Cancel' if 'Create mode'`, () => {
    component.isEditMode = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.form__actions-create .form__btn--save'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.form__actions-create .form__btn--cancel'))).not.toBeNull();
  });

  it(`should switch buttons when changing form state`, () => {
    component.isEditMode = true;
    component.changeFormState(false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.form__actions-edit .form__btn--edit'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.form__actions-edit .form__btn--cancel'))).not.toBeNull();

    component.changeFormState(true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.form__actions-edit .form__btn--save'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.form__actions-edit .form__btn--quit'))).not.toBeNull();
  });

  it(`should call 'onClassCreate()' method if 'Create mode' when form submit`, () => {
    const spyClassCreate = spyOn(component, 'onClassCreate').and.callThrough();
    const spyClassCreateService = spyOn(classesService, 'classesCreate').and.callThrough();

    component.isEditMode = false;

    component.form.patchValue({
      label: 'Class A',
      grade: '3',
      responsibleTeaches: [
        '5e45cdb813d85d00015d58d1',
        '5e46feeb6dad2100016653cc'
      ]
    });

    component.onSubmit();

    expect(spyClassCreate).toHaveBeenCalled();
    expect(spyClassCreateService).toHaveBeenCalled();
  });

  it(`should call 'onClassEdit()' method if 'Edit mode' when form submit`, () => {
    const spyClassEdit = spyOn(component, 'onClassEdit').and.callThrough();
    const spyClassUpdateService = spyOn(classesService, 'classesUpdate').and.callThrough();

    component.isEditMode = true;

    component.form.patchValue({
      label: 'Class A',
      grade: '3',
      responsibleTeaches: [
        '5e45cdb813d85d00015d58d1',
        '5e46feeb6dad2100016653cc'
      ]
    });
    component.classRoomModel.id = '5e52cb29a87f10000116c8c7';

    component.onSubmit();

    expect(spyClassEdit).toHaveBeenCalled();
    expect(spyClassUpdateService).toHaveBeenCalled();
  });

  it(`shouldn't call any methods if form is invalid`, () => {
    const spyClassEdit = spyOn(component, 'onClassEdit').and.callThrough();
    const spyClassCreate = spyOn(component, 'onClassCreate').and.callThrough();

    component.isEditMode = true;
    component.classRoomModel.id = '5e52cb29a87f10000116c8c7';

    expect(spyClassEdit).not.toHaveBeenCalled();

    component.isEditMode = false;

    expect(spyClassCreate).not.toHaveBeenCalled();
  });

  it('should unsubscribe from all observables if components destroyed', () => {
    component.ngOnDestroy();

    expect(component.isObservablesAlive).toBeFalsy();
  });

  it(`should return back to 'classes' if onCancel() method was called`, () => {
    const router = TestBed.inject(Router);
    const spyRouter = spyOn(router, 'navigate').and.callThrough();

    component.onCancel();

    expect(spyRouter).toHaveBeenCalledWith(['classes']);
  });
});
