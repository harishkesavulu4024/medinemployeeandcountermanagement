import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserCounterManagementDetailComponent } from './user-counter-management-detail.component';

describe('UserCounterManagement Management Detail Component', () => {
  let comp: UserCounterManagementDetailComponent;
  let fixture: ComponentFixture<UserCounterManagementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCounterManagementDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userCounterManagement: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserCounterManagementDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserCounterManagementDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userCounterManagement on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userCounterManagement).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
