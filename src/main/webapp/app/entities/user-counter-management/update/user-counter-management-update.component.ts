import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserCounterManagementFormService, UserCounterManagementFormGroup } from './user-counter-management-form.service';
import { IUserCounterManagement } from '../user-counter-management.model';
import { UserCounterManagementService } from '../service/user-counter-management.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IBranch } from 'app/entities/branch/branch.model';
import { BranchService } from 'app/entities/branch/service/branch.service';

@Component({
  selector: 'jhi-user-counter-management-update',
  templateUrl: './user-counter-management-update.component.html',
})
export class UserCounterManagementUpdateComponent implements OnInit {
  isSaving = false;
  userCounterManagement: IUserCounterManagement | null = null;

  usersSharedCollection: IUser[] = [];
  branchesSharedCollection: IBranch[] = [];
  denomValues: string[] = ['2000', '500', '200', '100', '50', '20', '10', '5', '2', '1'];
  totalAmountDisabled = true;
  denominationMap = new Map();

  editForm: UserCounterManagementFormGroup = this.userCounterManagementFormService.createUserCounterManagementFormGroup();

  constructor(
    protected userCounterManagementService: UserCounterManagementService,
    protected userCounterManagementFormService: UserCounterManagementFormService,
    protected userService: UserService,
    protected branchService: BranchService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareBranch = (o1: IBranch | null, o2: IBranch | null): boolean => this.branchService.compareBranch(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCounterManagement }) => {
      this.userCounterManagement = userCounterManagement;
      if (userCounterManagement) {
        this.updateForm(userCounterManagement);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  saveDenominationDetails(): void {
    console.log('Api details');
  }

  save(): void {
    this.isSaving = true;
    const userCounterManagement = this.userCounterManagementFormService.getUserCounterManagement(this.editForm);
    if (userCounterManagement.id !== null) {
      this.subscribeToSaveResponse(this.userCounterManagementService.update(userCounterManagement));
    } else {
      this.subscribeToSaveResponse(this.userCounterManagementService.create(userCounterManagement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserCounterManagement>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(userCounterManagement: IUserCounterManagement): void {
    this.userCounterManagement = userCounterManagement;
    this.userCounterManagementFormService.resetForm(this.editForm, userCounterManagement);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(
      this.usersSharedCollection,
      userCounterManagement.user
    );
    this.branchesSharedCollection = this.branchService.addBranchToCollectionIfMissing<IBranch>(
      this.branchesSharedCollection,
      userCounterManagement.branch
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.userCounterManagement?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.branchService
      .query()
      .pipe(map((res: HttpResponse<IBranch[]>) => res.body ?? []))
      .pipe(
        map((branches: IBranch[]) =>
          this.branchService.addBranchToCollectionIfMissing<IBranch>(branches, this.userCounterManagement?.branch)
        )
      )
      .subscribe((branches: IBranch[]) => (this.branchesSharedCollection = branches));
  }
}
