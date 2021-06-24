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
  succesUpdate = false;
  updateError = false;
  propertyName: string;
  optionSelectList = [{ desc: 'GET' }, { desc: 'ADD' }, { desc: 'UPDATE' }, { desc: 'DELETE' }]
  
  constructor(private formBuilder: FormBuilder) { }

  //TODO Solve core.js:4197 ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
  //TODO reset forms on changes, and update sub select drop

  ngOnInit() {
    this.form = this.getForm();
    this.addForm = this.getAddForm();
    this.updateForm = this.getUpdateForm();
    this.deleteForm = this.getDeleteForm();

    this.form.get('formOption').valueChanges.subscribe(value => {
      this.showData = false;
      if(value === "UPDATE") this.updateForm.get('selectField').setValue(undefined);
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
    this.updateError = false;
    this.noPropertyError = false;
    this.succesUpdate = false;
    if (this.updateForm.valid) {
      this.propertyName = this.updateForm.get('name').value;
      let newPropertyName = this.updateForm.get('newName').value;
      if (newPropertyName in this.data) {
        this.updateError = true;
      }
      else if (this.propertyName in this.data) {
        if (this.updateForm.get('selectField').value == 'name') {
          let newJson = {};
          let keys = Object.keys(this.data);
          let indexJson = Object.keys(this.data).indexOf(this.propertyName);
          for (let index = 0; index < keys.length; index++) {
            if (index !== indexJson) {
              newJson[keys[index]] = Object.values(this.data)[index];
            }
            else {
              newJson[newPropertyName] = Object.values(this.data)[index];
            }
          }
          this.data = newJson;
        }
        else {
          let propertyValue = this.updateForm.get('value').value;
          this.data[this.propertyName] = propertyValue;
        }
        this.succesUpdate = true;
        this.updateForm.get('name').reset();
        this.updateForm.get('value').reset();
        this.updateForm.get('newName').reset();
      }
      else {
        this.updateError = true;
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
        this.succesUpdate = false;
        if(value === 'value'){
          this.updateForm.get('value').setValidators([Validators.required, Validators.nullValidator])
          this.updateForm.get('newName').setValidators([])
        }
        else if(value){
          this.updateForm.get('value').setValidators([])
          this.updateForm.get('newName').setValidators([Validators.required, Validators.nullValidator])
        }
        this.updateForm.updateValueAndValidity();
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
