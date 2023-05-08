import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StockSellerInfoFormService } from './stock-seller-info-form.service';
import { StockSellerInfoService } from '../service/stock-seller-info.service';
import { IStockSellerInfo } from '../stock-seller-info.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { StockSellerInfoUpdateComponent } from './stock-seller-info-update.component';

describe('StockSellerInfo Management Update Component', () => {
  let comp: StockSellerInfoUpdateComponent;
  let fixture: ComponentFixture<StockSellerInfoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stockSellerInfoFormService: StockSellerInfoFormService;
  let stockSellerInfoService: StockSellerInfoService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StockSellerInfoUpdateComponent],
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
      .overrideTemplate(StockSellerInfoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StockSellerInfoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stockSellerInfoFormService = TestBed.inject(StockSellerInfoFormService);
    stockSellerInfoService = TestBed.inject(StockSellerInfoService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const stockSellerInfo: IStockSellerInfo = { id: 456 };
      const user: IUser = { id: 3287 };
      stockSellerInfo.user = user;

      const userCollection: IUser[] = [{ id: 92615 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ stockSellerInfo });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const stockSellerInfo: IStockSellerInfo = { id: 456 };
      const user: IUser = { id: 84782 };
      stockSellerInfo.user = user;

      activatedRoute.data = of({ stockSellerInfo });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.stockSellerInfo).toEqual(stockSellerInfo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStockSellerInfo>>();
      const stockSellerInfo = { id: 123 };
      jest.spyOn(stockSellerInfoFormService, 'getStockSellerInfo').mockReturnValue(stockSellerInfo);
      jest.spyOn(stockSellerInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stockSellerInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stockSellerInfo }));
      saveSubject.complete();

      // THEN
      expect(stockSellerInfoFormService.getStockSellerInfo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stockSellerInfoService.update).toHaveBeenCalledWith(expect.objectContaining(stockSellerInfo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStockSellerInfo>>();
      const stockSellerInfo = { id: 123 };
      jest.spyOn(stockSellerInfoFormService, 'getStockSellerInfo').mockReturnValue({ id: null });
      jest.spyOn(stockSellerInfoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stockSellerInfo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stockSellerInfo }));
      saveSubject.complete();

      // THEN
      expect(stockSellerInfoFormService.getStockSellerInfo).toHaveBeenCalled();
      expect(stockSellerInfoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStockSellerInfo>>();
      const stockSellerInfo = { id: 123 };
      jest.spyOn(stockSellerInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stockSellerInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stockSellerInfoService.update).toHaveBeenCalled();
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
  });
});
