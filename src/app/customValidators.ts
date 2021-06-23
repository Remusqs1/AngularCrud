import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    static AlphaNumericWithOutWhiteSpace(control: AbstractControl) {
        if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]/.test(control.value))) {
            control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]*/g, ''));
            return null;
        }
    }

}