import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-proj';
  form!: FormGroup;
  inputElement: any;
  inputTest!: Observable<{ inputValue: string }>;
  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}

  onClick() {}
}
