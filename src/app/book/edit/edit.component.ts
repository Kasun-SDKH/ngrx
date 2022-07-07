import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/app.state';
import { invokeUpdateBookApi } from '../store/book.action';
import { selectBookById } from '../store/book.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      title: [''],
      author: [''],
      cost: [''],
    });

    let fetchFromData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );
    fetchFromData$.subscribe((data) => {
      if (data) {
        this.form.patchValue(data);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public onSubmit(): void {
    this.store.dispatch(
      invokeUpdateBookApi({ payload: { ...this.form.value } })
    );
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
