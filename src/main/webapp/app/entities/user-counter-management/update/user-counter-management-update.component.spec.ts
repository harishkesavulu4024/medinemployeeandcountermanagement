import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserCounterManagementFormService } from './user-counter-management-form.service';
import { UserCounterManagementService } from '../service/user-counter-management.service';
import { IUserCounterManagement } from '../user-counter-management.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IBranch } from 'app/entities/branch/branch.model';
import { BranchService } from 'app/entities/branch/service/branch.service';

import { UserCounterManagementUpdateComponent } from './user-counter-management-update.component';

describe('UserCounterManagement Management Update Component', () => {
  let comp: UserCounterManagementUpdateComponent;
  let fixture: ComponentFixture<UserCounterManagementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userCounterManagementFormService: UserCounterManagementFormService;
  let userCounterManagementService: UserCounterManagementService;
  let userService: UserService;
  let branchService: BranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserCounterManagementUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UserCounterManagementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserCounterManagementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userCounterManagementFormService = TestBed.inject(UserCounterManagementFormService);
    userCounterManagementService = TestBed.inject(UserCounterManagementService);
    userService = TestBed.inject(UserService);
    branchService = TestBed.inject(BranchService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const userCounterManagement: IUserCounterManagement = { id: 456 };
      const user: IUser = { id: 16619 };
      userCounterManagement.user = user;

      const userCollection: IUser[] = [{ id: 43387 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userCounterManagement });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Branch query and add missing value', () => {
      const userCounterManagement: IUserCounterManagement = { id: 456 };
      const branch: IBranch = { id: 44999 };
      userCounterManagement.branch = branch;

      const branchCollection: IBranch[] = [{ id: 50178 }];
      jest.spyOn(branchService, 'query').mockReturnValue(of(new HttpResponse({ body: branchCollection })));
      const additionalBranches = [branch];
      const expectedCollection: IBranch[] = [...additionalBranches, ...branchCollection];
      jest.spyOn(branchService, 'addBranchToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userCounterManagement });
      comp.ngOnInit();

      expect(branchService.query).toHaveBeenCalled();
      expect(branchService.addBranchToCollectionIfMissing).toHaveBeenCalledWith(
        branchCollection,
        ...additionalBranches.map(expect.objectContaining)
      );
      expect(comp.branchesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userCounterManagement: IUserCounterManagement = { id: 456 };
      const user: IUser = { id: 90149 };
      userCounterManagement.user = user;
      const branch: IBranch = { id: 55616 };
      userCounterManagement.branch = branch;

      activatedRoute.data = of({ userCounterManagement });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.branchesSharedCollection).toContain(branch);
      expect(comp.userCounterManagement).toEqual(userCounterManagement);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserCounterManagement>>();
      const userCounterManagement = { id: 123 };
      jest.spyOn(userCounterManagementFormService, 'getUserCounterManagement').mockReturnValue(userCounterManagement);
      jest.spyOn(userCounterManagementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userCounterManagement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userCounterManagement }));
      saveSubject.complete();

      // THEN
      expect(userCounterManagementFormService.getUserCounterManagement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userCounterManagementService.update).toHaveBeenCalledWith(expect.objectContaining(userCounterManagement));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserCounterManagement>>();
      const userCounterManagement = { id: 123 };
      jest.spyOn(userCounterManagementFormService, 'getUserCounterManagement').mockReturnValue({ id: null });
      jest.spyOn(userCounterManagementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userCounterManagement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userCounterManagement }));
      saveSubject.complete();

      // THEN
      expect(userCounterManagementFormService.getUserCounterManagement).toHaveBeenCalled();
      expect(userCounterManagementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserCounterManagement>>();
      const userCounterManagement = { id: 123 };
      jest.spyOn(userCounterManagementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userCounterManagement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userCounterManagementService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBranch', () => {
      it('Should forward to branchService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(branchService, 'compareBranch');
        comp.compareBranch(entity, entity2);
        expect(branchService.compareBranch).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
