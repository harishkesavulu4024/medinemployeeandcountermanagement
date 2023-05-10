import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserCounterManagement, NewUserCounterManagement } from '../user-counter-management.model';

export type PartialUpdateUserCounterManagement = Partial<IUserCounterManagement> & Pick<IUserCounterManagement, 'id'>;

type RestOf<T extends IUserCounterManagement | NewUserCounterManagement> = Omit<T, 'openingTime' | 'closingTime'> & {
  openingTime?: string | null;
  closingTime?: string | null;
};

export type RestUserCounterManagement = RestOf<IUserCounterManagement>;

export type NewRestUserCounterManagement = RestOf<NewUserCounterManagement>;

export type PartialUpdateRestUserCounterManagement = RestOf<PartialUpdateUserCounterManagement>;

export type EntityResponseType = HttpResponse<IUserCounterManagement>;
export type EntityArrayResponseType = HttpResponse<IUserCounterManagement[]>;

@Injectable({ providedIn: 'root' })
export class UserCounterManagementService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usercountersummary');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userCounterManagement: NewUserCounterManagement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userCounterManagement);
    return this.http
      .post<RestUserCounterManagement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(userCounterManagement: IUserCounterManagement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userCounterManagement);
    return this.http
      .put<RestUserCounterManagement>(`${this.resourceUrl}/${this.getUserCounterManagementIdentifier(userCounterManagement)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(userCounterManagement: PartialUpdateUserCounterManagement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userCounterManagement);
    return this.http
      .patch<RestUserCounterManagement>(`${this.resourceUrl}/${this.getUserCounterManagementIdentifier(userCounterManagement)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestUserCounterManagement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestUserCounterManagement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserCounterManagementIdentifier(userCounterManagement: Pick<IUserCounterManagement, 'id'>): number {
    return userCounterManagement.id;
  }

  compareUserCounterManagement(o1: Pick<IUserCounterManagement, 'id'> | null, o2: Pick<IUserCounterManagement, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserCounterManagementIdentifier(o1) === this.getUserCounterManagementIdentifier(o2) : o1 === o2;
  }

  addUserCounterManagementToCollectionIfMissing<Type extends Pick<IUserCounterManagement, 'id'>>(
    userCounterManagementCollection: Type[],
    ...userCounterManagementsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userCounterManagements: Type[] = userCounterManagementsToCheck.filter(isPresent);
    if (userCounterManagements.length > 0) {
      const userCounterManagementCollectionIdentifiers = userCounterManagementCollection.map(
        userCounterManagementItem => this.getUserCounterManagementIdentifier(userCounterManagementItem)!
      );
      const userCounterManagementsToAdd = userCounterManagements.filter(userCounterManagementItem => {
        const userCounterManagementIdentifier = this.getUserCounterManagementIdentifier(userCounterManagementItem);
        if (userCounterManagementCollectionIdentifiers.includes(userCounterManagementIdentifier)) {
          return false;
        }
        userCounterManagementCollectionIdentifiers.push(userCounterManagementIdentifier);
        return true;
      });
      return [...userCounterManagementsToAdd, ...userCounterManagementCollection];
    }
    return userCounterManagementCollection;
  }

  protected convertDateFromClient<T extends IUserCounterManagement | NewUserCounterManagement | PartialUpdateUserCounterManagement>(
    userCounterManagement: T
  ): RestOf<T> {
    return {
      ...userCounterManagement,
      openingTime: userCounterManagement.openingTime?.toJSON() ?? null,
      closingTime: userCounterManagement.closingTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restUserCounterManagement: RestUserCounterManagement): IUserCounterManagement {
    return {
      ...restUserCounterManagement,
      openingTime: restUserCounterManagement.openingTime ? dayjs(restUserCounterManagement.openingTime) : undefined,
      closingTime: restUserCounterManagement.closingTime ? dayjs(restUserCounterManagement.closingTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestUserCounterManagement>): HttpResponse<IUserCounterManagement> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestUserCounterManagement[]>): HttpResponse<IUserCounterManagement[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
