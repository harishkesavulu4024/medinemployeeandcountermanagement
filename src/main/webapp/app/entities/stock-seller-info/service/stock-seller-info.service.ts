import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStockSellerInfo, NewStockSellerInfo } from '../stock-seller-info.model';

export type PartialUpdateStockSellerInfo = Partial<IStockSellerInfo> & Pick<IStockSellerInfo, 'id'>;

type RestOf<T extends IStockSellerInfo | NewStockSellerInfo> = Omit<T, 'paymentDate'> & {
  paymentDate?: string | null;
};

export type RestStockSellerInfo = RestOf<IStockSellerInfo>;

export type NewRestStockSellerInfo = RestOf<NewStockSellerInfo>;

export type PartialUpdateRestStockSellerInfo = RestOf<PartialUpdateStockSellerInfo>;

export type EntityResponseType = HttpResponse<IStockSellerInfo>;
export type EntityArrayResponseType = HttpResponse<IStockSellerInfo[]>;

@Injectable({ providedIn: 'root' })
export class StockSellerInfoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/stock-seller-infos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(stockSellerInfo: NewStockSellerInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockSellerInfo);
    return this.http
      .post<RestStockSellerInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(stockSellerInfo: IStockSellerInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockSellerInfo);
    return this.http
      .put<RestStockSellerInfo>(`${this.resourceUrl}/${this.getStockSellerInfoIdentifier(stockSellerInfo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(stockSellerInfo: PartialUpdateStockSellerInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockSellerInfo);
    return this.http
      .patch<RestStockSellerInfo>(`${this.resourceUrl}/${this.getStockSellerInfoIdentifier(stockSellerInfo)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestStockSellerInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestStockSellerInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStockSellerInfoIdentifier(stockSellerInfo: Pick<IStockSellerInfo, 'id'>): number {
    return stockSellerInfo.id;
  }

  compareStockSellerInfo(o1: Pick<IStockSellerInfo, 'id'> | null, o2: Pick<IStockSellerInfo, 'id'> | null): boolean {
    return o1 && o2 ? this.getStockSellerInfoIdentifier(o1) === this.getStockSellerInfoIdentifier(o2) : o1 === o2;
  }

  addStockSellerInfoToCollectionIfMissing<Type extends Pick<IStockSellerInfo, 'id'>>(
    stockSellerInfoCollection: Type[],
    ...stockSellerInfosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const stockSellerInfos: Type[] = stockSellerInfosToCheck.filter(isPresent);
    if (stockSellerInfos.length > 0) {
      const stockSellerInfoCollectionIdentifiers = stockSellerInfoCollection.map(
        stockSellerInfoItem => this.getStockSellerInfoIdentifier(stockSellerInfoItem)!
      );
      const stockSellerInfosToAdd = stockSellerInfos.filter(stockSellerInfoItem => {
        const stockSellerInfoIdentifier = this.getStockSellerInfoIdentifier(stockSellerInfoItem);
        if (stockSellerInfoCollectionIdentifiers.includes(stockSellerInfoIdentifier)) {
          return false;
        }
        stockSellerInfoCollectionIdentifiers.push(stockSellerInfoIdentifier);
        return true;
      });
      return [...stockSellerInfosToAdd, ...stockSellerInfoCollection];
    }
    return stockSellerInfoCollection;
  }

  protected convertDateFromClient<T extends IStockSellerInfo | NewStockSellerInfo | PartialUpdateStockSellerInfo>(
    stockSellerInfo: T
  ): RestOf<T> {
    return {
      ...stockSellerInfo,
      paymentDate: stockSellerInfo.paymentDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restStockSellerInfo: RestStockSellerInfo): IStockSellerInfo {
    return {
      ...restStockSellerInfo,
      paymentDate: restStockSellerInfo.paymentDate ? dayjs(restStockSellerInfo.paymentDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestStockSellerInfo>): HttpResponse<IStockSellerInfo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestStockSellerInfo[]>): HttpResponse<IStockSellerInfo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
