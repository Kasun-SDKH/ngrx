import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/app.state';
import { invokeDeleteBookApi, involeBookAPI } from '../store/book.action';
import { selectBooks } from '../store/book.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router
  ) {}
  books$ = this.store.pipe(select(selectBooks));
  ngOnInit(): void {
    this.store.dispatch(involeBookAPI());
  }
  onDelete(deleteId: number) {
    this.store.dispatch(invokeDeleteBookApi({ id: deleteId }));
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
