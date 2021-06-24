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
  updateForm: FormGroup;
  deleteForm: FormGroup;
  hasError = false;
  noPropertyError = false;
  noPropertyDeleteError = false;
  alreadyExistsError = false;
  propertyName: string;
  optionSelectList = [{ desc: 'GET' }, { desc: 'ADD' }, { desc: 'UPDATE' }, { desc: 'DELETE' }]
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.getForm();
    this.addForm = this.getAddForm();
    this.updateForm = this.getUpdateForm();
    this.deleteForm = this.getDeleteForm();

    this.form.get('formOption').valueChanges.subscribe(() => {
      this.showData = false;
    });
  }

  getData() {
    this.showData = true;
  }

  addData() {
    this.hasError = false;
    this.alreadyExistsError = false;
    if (this.addForm.valid) {
      this.propertyName = this.addForm.get('name').value;
      let propertyValue = this.addForm.get('value').value;
      if (this.propertyName in this.data) {
        this.alreadyExistsError = true;
      }
      else {
        this.data[this.propertyName] = propertyValue;
        this.showData = true;
      }
    }
    else {
      this.hasError = true;
    }
  }

  updateData() {
    this.hasError = false;
    this.noPropertyError = false;
    if (this.updateForm.valid) {
      //TODO update value or name, according to the case
      this.propertyName = this.updateForm.get('name').value;
      let propertyValue = this.updateForm.get('value').value;
      let newPropertyName = this.updateForm.get('newName').value;
      if (this.propertyName in this.data) {
        this.data[this.propertyName] = propertyValue;
      }
      else {
        this.noPropertyError = true;
      }
    }
    else {
      this.hasError = true;
    }
  }

  deleteData() {
    this.hasError = false;
    this.noPropertyDeleteError = false;
    if (this.deleteForm.valid) {
      this.propertyName = this.deleteForm.get('name').value;
      if (this.propertyName in this.data) {
        delete this.data[this.propertyName];
      }
      else {
        this.noPropertyDeleteError = true;
      }
    }
    else {
      this.hasError = true;
    }
  }

  getForm(): FormGroup {
    const form = this.formBuilder.group({
      formOption: [{ value: undefined, disabled: false }, [Validators.required, Validators.nullValidator]],
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

  getUpdateForm(): FormGroup {
    const form = this.formBuilder.group({
      selectField: [{ value: undefined, disabled: false }, [Validators.required, Validators.nullValidator]],
      name: [{ value: undefined, disabled: false }, [Validators.required, Validators.nullValidator, CustomValidators.AlphaNumericWithOutWhiteSpace]],
      value: [{ value: undefined, disabled: false }, []],
      newName: [{ value: undefined, disabled: false }, []],
    });

    form.get('selectField').valueChanges.subscribe(value =>{
      
      if(value !== undefined){
        this.hasError = false;
        //TODO Set conditional validators for value or newName
      }
      
    });

    return form;
  }

  getDeleteForm(): FormGroup {
    const form = this.formBuilder.group({
      sampleField: [{ value: undefined, disabled: true }, []],
      name: [{ value: undefined, disabled: false }, [Validators.required, Validators.nullValidator, CustomValidators.AlphaNumericWithOutWhiteSpace]],
    });
    return form;
  }
}
