import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../stock-seller-info.test-samples';

import { StockSellerInfoFormService } from './stock-seller-info-form.service';

describe('StockSellerInfo Form Service', () => {
  let service: StockSellerInfoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockSellerInfoFormService);
  });

  describe('Service methods', () => {
    describe('createStockSellerInfoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStockSellerInfoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            distributorName: expect.any(Object),
            paymentDate: expect.any(Object),
            totalAmount: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IStockSellerInfo should create a new form with FormGroup', () => {
        const formGroup = service.createStockSellerInfoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            distributorName: expect.any(Object),
            paymentDate: expect.any(Object),
            totalAmount: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getStockSellerInfo', () => {
      it('should return NewStockSellerInfo for default StockSellerInfo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStockSellerInfoFormGroup(sampleWithNewData);

        const stockSellerInfo = service.getStockSellerInfo(formGroup) as any;

        expect(stockSellerInfo).toMatchObject(sampleWithNewData);
      });

      it('should return NewStockSellerInfo for empty StockSellerInfo initial value', () => {
        const formGroup = service.createStockSellerInfoFormGroup();

        const stockSellerInfo = service.getStockSellerInfo(formGroup) as any;

        expect(stockSellerInfo).toMatchObject({});
      });

      it('should return IStockSellerInfo', () => {
        const formGroup = service.createStockSellerInfoFormGroup(sampleWithRequiredData);

        const stockSellerInfo = service.getStockSellerInfo(formGroup) as any;

        expect(stockSellerInfo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStockSellerInfo should not enable id FormControl', () => {
        const formGroup = service.createStockSellerInfoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStockSellerInfo should disable id FormControl', () => {
        const formGroup = service.createStockSellerInfoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
