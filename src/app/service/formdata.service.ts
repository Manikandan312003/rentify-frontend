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
            }
            else if(value instanceof Array){
              value.forEach((val, index) => {
                formData.append(key, val)
            });
            
            }
             else {
              formData.append(key, value)
            }
          }
        )
        return formData;
      }
}