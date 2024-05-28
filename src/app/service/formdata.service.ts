import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn:'root',

})

export class FormDataService{
    static formGrouptoData(formGroup: FormGroup) {
        let formData = new FormData();
        Object.keys(formGroup.controls).forEach(
          (key) => {
            let formControlObj = formGroup.controls[key];
            let value = formControlObj.value;
            if (value instanceof File) {
              formData.append(key, value, value.name)
            } else {
              formData.append(key, value)
            }
            console.log(key, value)
          }
        )
        return formData;
      }
}