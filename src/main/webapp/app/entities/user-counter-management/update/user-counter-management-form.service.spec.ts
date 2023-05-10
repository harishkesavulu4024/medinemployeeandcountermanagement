import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-counter-management.test-samples';

import { UserCounterManagementFormService } from './user-counter-management-form.service';

describe('UserCounterManagement Form Service', () => {
  let service: UserCounterManagementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCounterManagementFormService);
  });

  describe('Service methods', () => {
    describe('createUserCounterManagementFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserCounterManagementFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            totalAmount: expect.any(Object),
            notes: expect.any(Object),
            openingTime: expect.any(Object),
            closingTime: expect.any(Object),
            denominations: expect.any(Object),
            user: expect.any(Object),
            branch: expect.any(Object),
          })
        );
      });

      it('passing IUserCounterManagement should create a new form with FormGroup', () => {
        const formGroup = service.createUserCounterManagementFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            totalAmount: expect.any(Object),
            notes: expect.any(Object),
            openingTime: expect.any(Object),
            closingTime: expect.any(Object),
            denominations: expect.any(Object),
            user: expect.any(Object),
            branch: expect.any(Object),
          })
        );
      });
    });

    describe('getUserCounterManagement', () => {
      it('should return NewUserCounterManagement for default UserCounterManagement initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserCounterManagementFormGroup(sampleWithNewData);

        const userCounterManagement = service.getUserCounterManagement(formGroup) as any;

        expect(userCounterManagement).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserCounterManagement for empty UserCounterManagement initial value', () => {
        const formGroup = service.createUserCounterManagementFormGroup();

        const userCounterManagement = service.getUserCounterManagement(formGroup) as any;

        expect(userCounterManagement).toMatchObject({});
      });

      it('should return IUserCounterManagement', () => {
        const formGroup = service.createUserCounterManagementFormGroup(sampleWithRequiredData);

        const userCounterManagement = service.getUserCounterManagement(formGroup) as any;

        expect(userCounterManagement).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserCounterManagement should not enable id FormControl', () => {
        const formGroup = service.createUserCounterManagementFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserCounterManagement should disable id FormControl', () => {
        const formGroup = service.createUserCounterManagementFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
