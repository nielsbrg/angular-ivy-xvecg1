import { Directive, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  private _destroy$?: Subject<void>;

  protected takeUntilDestroy = <T>() => {
    if (!this._destroy$) {
      this._destroy$ = new Subject<void>();
    }

    return takeUntil<T>(this._destroy$);
  };

  ngOnDestroy() {
    if (this._destroy$) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }
}
