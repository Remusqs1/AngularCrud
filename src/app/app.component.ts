import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showGetData = false;
  data = { a: '1', b: 2 }
  form: FormGroup;
  hasError: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.getForm();

    this.form.get('formOption').valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  getData() {
    this.showGetData = true;
  }

  getForm(): FormGroup {
    const form = this.formBuilder.group({
      formOption: [
        {
          value: undefined,
          disabled: false
        },
        [ Validators.required, Validators.nullValidator,
          // CustomValidators.IsNullorEmpty,
        ]
      ],
    });
    return form;
  }
}
