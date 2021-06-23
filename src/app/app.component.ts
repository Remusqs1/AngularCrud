import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './CustomValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showData = false;
  data: any = { a: "1", b: 2 }
  form: FormGroup;
  addForm: FormGroup;
  hasError: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.getForm();
    this.addForm = this.getAddForm();

    this.form.get('formOption').valueChanges.subscribe(value => {
      this.showData = false;
    });
  }

  getData() {
    this.showData = true;
  }

  addData() {
    this.hasError = false;
    if (this.addForm.valid) {
      let propertyName = this.addForm.get('name').value;
      let propertyValue = this.addForm.get('value').value;
      this.data[propertyName] = propertyValue;
      console.log(this.data);
      this.showData = true;
    }
    else{
      this.hasError = true;
    }
  }

  getForm(): FormGroup {
    const form = this.formBuilder.group({
      formOption: [
        { value: undefined, disabled: false },
        [Validators.required, Validators.nullValidator]
      ],
    });
    return form;
  }

  getAddForm(): FormGroup {
    const form = this.formBuilder.group({
      name: [{ value: undefined, disabled: false }, [Validators.required, Validators.nullValidator, CustomValidators.AlphaNumericWithOutWhiteSpace]],
      value: [{ value: undefined, disabled: false }, [Validators.required, Validators.nullValidator]],
    });
    return form;
  }
}
