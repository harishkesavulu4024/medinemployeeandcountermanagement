import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserCounterManagement } from '../user-counter-management.model';

@Component({
  selector: 'jhi-user-counter-management-detail',
  templateUrl: './user-counter-management-detail.component.html',
})
export class UserCounterManagementDetailComponent implements OnInit {
  userCounterManagement: IUserCounterManagement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCounterManagement }) => {
      this.userCounterManagement = userCounterManagement;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
