import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IUserCounterManagement, NewUserCounterManagement } from '../user-counter-management.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserCounterManagement for edit and NewUserCounterManagementFormGroupInput for create.
 */
type UserCounterManagementFormGroupInput = IUserCounterManagement | PartialWithRequiredKeyOf<NewUserCounterManagement>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IUserCounterManagement | NewUserCounterManagement> = Omit<T, 'openingTime' | 'closingTime'> & {
  openingTime?: string | null;
  closingTime?: string | null;
};

type UserCounterManagementFormRawValue = FormValueOf<IUserCounterManagement>;

type NewUserCounterManagementFormRawValue = FormValueOf<NewUserCounterManagement>;

type UserCounterManagementFormDefaults = Pick<NewUserCounterManagement, 'id' | 'openingTime' | 'closingTime'>;

type UserCounterManagementFormGroupContent = {
  id: FormControl<UserCounterManagementFormRawValue['id'] | NewUserCounterManagement['id']>;
  totalAmount: FormControl<UserCounterManagementFormRawValue['totalAmount']>;
  notes: FormControl<UserCounterManagementFormRawValue['notes']>;
  openingTime: FormControl<UserCounterManagementFormRawValue['openingTime']>;
  closingTime: FormControl<UserCounterManagementFormRawValue['closingTime']>;
  denominations: FormControl<UserCounterManagementFormRawValue['denominations']>;
  user: FormControl<UserCounterManagementFormRawValue['user']>;
  branch: FormControl<UserCounterManagementFormRawValue['branch']>;
};

export type UserCounterManagementFormGroup = FormGroup<UserCounterManagementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserCounterManagementFormService {
  createUserCounterManagementFormGroup(
    userCounterManagement: UserCounterManagementFormGroupInput = { id: null }
  ): UserCounterManagementFormGroup {
    const userCounterManagementRawValue = this.convertUserCounterManagementToUserCounterManagementRawValue({
      ...this.getFormDefaults(),
      ...userCounterManagement,
    });
    return new FormGroup<UserCounterManagementFormGroupContent>({
      id: new FormControl(
        { value: userCounterManagementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      totalAmount: new FormControl(userCounterManagementRawValue.totalAmount, {
        validators: [Validators.required],
      }),
      notes: new FormControl(userCounterManagementRawValue.notes),
      openingTime: new FormControl(userCounterManagementRawValue.openingTime, {
        validators: [Validators.required],
      }),
      closingTime: new FormControl(userCounterManagementRawValue.closingTime, {
        validators: [Validators.required],
      }),
      denominations: new FormControl(userCounterManagementRawValue.denominations, {
        validators: [Validators.required],
      }),
      user: new FormControl(userCounterManagementRawValue.user, {
        validators: [Validators.required],
      }),
      branch: new FormControl(userCounterManagementRawValue.branch, {
        validators: [Validators.required],
      }),
    });
  }

  getUserCounterManagement(form: UserCounterManagementFormGroup): IUserCounterManagement | NewUserCounterManagement {
    return this.convertUserCounterManagementRawValueToUserCounterManagement(
      form.getRawValue() as UserCounterManagementFormRawValue | NewUserCounterManagementFormRawValue
    );
  }

  resetForm(form: UserCounterManagementFormGroup, userCounterManagement: UserCounterManagementFormGroupInput): void {
    const userCounterManagementRawValue = this.convertUserCounterManagementToUserCounterManagementRawValue({
      ...this.getFormDefaults(),
      ...userCounterManagement,
    });
    form.reset(
      {
        ...userCounterManagementRawValue,
        id: { value: userCounterManagementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserCounterManagementFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      openingTime: currentTime,
      closingTime: currentTime,
    };
  }

  private convertUserCounterManagementRawValueToUserCounterManagement(
    rawUserCounterManagement: UserCounterManagementFormRawValue | NewUserCounterManagementFormRawValue
  ): IUserCounterManagement | NewUserCounterManagement {
    return {
      ...rawUserCounterManagement,
      openingTime: dayjs(rawUserCounterManagement.openingTime, DATE_TIME_FORMAT),
      closingTime: dayjs(rawUserCounterManagement.closingTime, DATE_TIME_FORMAT),
    };
  }

  private convertUserCounterManagementToUserCounterManagementRawValue(
    userCounterManagement: IUserCounterManagement | (Partial<NewUserCounterManagement> & UserCounterManagementFormDefaults)
  ): UserCounterManagementFormRawValue | PartialWithRequiredKeyOf<NewUserCounterManagementFormRawValue> {
    return {
      ...userCounterManagement,
      openingTime: userCounterManagement.openingTime ? userCounterManagement.openingTime.format(DATE_TIME_FORMAT) : undefined,
      closingTime: userCounterManagement.closingTime ? userCounterManagement.closingTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
