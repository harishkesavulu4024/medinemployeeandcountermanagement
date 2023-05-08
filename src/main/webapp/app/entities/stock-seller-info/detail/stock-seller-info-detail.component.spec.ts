import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockSellerInfoDetailComponent } from './stock-seller-info-detail.component';

describe('StockSellerInfo Management Detail Component', () => {
  let comp: StockSellerInfoDetailComponent;
  let fixture: ComponentFixture<StockSellerInfoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockSellerInfoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ stockSellerInfo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StockSellerInfoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StockSellerInfoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load stockSellerInfo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.stockSellerInfo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
