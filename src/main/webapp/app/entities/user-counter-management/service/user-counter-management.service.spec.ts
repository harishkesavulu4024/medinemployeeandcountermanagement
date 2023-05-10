import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUserCounterManagement } from '../user-counter-management.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../user-counter-management.test-samples';

import { UserCounterManagementService, RestUserCounterManagement } from './user-counter-management.service';

const requireRestSample: RestUserCounterManagement = {
  ...sampleWithRequiredData,
  openingTime: sampleWithRequiredData.openingTime?.toJSON(),
  closingTime: sampleWithRequiredData.closingTime?.toJSON(),
};

describe('UserCounterManagement Service', () => {
  let service: UserCounterManagementService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserCounterManagement | IUserCounterManagement[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserCounterManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a UserCounterManagement', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userCounterManagement = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userCounterManagement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserCounterManagement', () => {
      const userCounterManagement = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userCounterManagement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserCounterManagement', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserCounterManagement', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserCounterManagement', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUserCounterManagementToCollectionIfMissing', () => {
      it('should add a UserCounterManagement to an empty array', () => {
        const userCounterManagement: IUserCounterManagement = sampleWithRequiredData;
        expectedResult = service.addUserCounterManagementToCollectionIfMissing([], userCounterManagement);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userCounterManagement);
      });

      it('should not add a UserCounterManagement to an array that contains it', () => {
        const userCounterManagement: IUserCounterManagement = sampleWithRequiredData;
        const userCounterManagementCollection: IUserCounterManagement[] = [
          {
            ...userCounterManagement,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserCounterManagementToCollectionIfMissing(userCounterManagementCollection, userCounterManagement);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserCounterManagement to an array that doesn't contain it", () => {
        const userCounterManagement: IUserCounterManagement = sampleWithRequiredData;
        const userCounterManagementCollection: IUserCounterManagement[] = [sampleWithPartialData];
        expectedResult = service.addUserCounterManagementToCollectionIfMissing(userCounterManagementCollection, userCounterManagement);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userCounterManagement);
      });

      it('should add only unique UserCounterManagement to an array', () => {
        const userCounterManagementArray: IUserCounterManagement[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userCounterManagementCollection: IUserCounterManagement[] = [sampleWithRequiredData];
        expectedResult = service.addUserCounterManagementToCollectionIfMissing(
          userCounterManagementCollection,
          ...userCounterManagementArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userCounterManagement: IUserCounterManagement = sampleWithRequiredData;
        const userCounterManagement2: IUserCounterManagement = sampleWithPartialData;
        expectedResult = service.addUserCounterManagementToCollectionIfMissing([], userCounterManagement, userCounterManagement2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userCounterManagement);
        expect(expectedResult).toContain(userCounterManagement2);
      });

      it('should accept null and undefined values', () => {
        const userCounterManagement: IUserCounterManagement = sampleWithRequiredData;
        expectedResult = service.addUserCounterManagementToCollectionIfMissing([], null, userCounterManagement, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userCounterManagement);
      });

      it('should return initial array if no UserCounterManagement is added', () => {
        const userCounterManagementCollection: IUserCounterManagement[] = [sampleWithRequiredData];
        expectedResult = service.addUserCounterManagementToCollectionIfMissing(userCounterManagementCollection, undefined, null);
        expect(expectedResult).toEqual(userCounterManagementCollection);
      });
    });

    describe('compareUserCounterManagement', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserCounterManagement(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserCounterManagement(entity1, entity2);
        const compareResult2 = service.compareUserCounterManagement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserCounterManagement(entity1, entity2);
        const compareResult2 = service.compareUserCounterManagement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserCounterManagement(entity1, entity2);
        const compareResult2 = service.compareUserCounterManagement(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
