import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserCounterManagement } from '../user-counter-management.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, UserCounterManagementService } from '../service/user-counter-management.service';
import { UserCounterManagementDeleteDialogComponent } from '../delete/user-counter-management-delete-dialog.component';

@Component({
  selector: 'jhi-user-counter-management-total-balance',
  templateUrl: './user-counter-management-total-balance.html',
})
export class UserCounterManagementTotalbalanceComponent implements OnInit {
  userCounterManagements?: IUserCounterManagement[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;
  totalCounterAmountByDate: any;

  constructor(
    protected userCounterManagementService: UserCounterManagementService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IUserCounterManagement): number =>
    this.userCounterManagementService.getUserCounterManagementIdentifier(item);

  ngOnInit(): void {
    this.fetchUserCounterBalanceDetails();
  }

  fetchUserCounterBalanceDetails(): void {
    this.userCounterManagementService
      .getCounterTotalBalanceByDate()
      .subscribe(totalbalanceByDate => (this.totalCounterAmountByDate = totalbalanceByDate));
  }
}
