import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private static alertSubject = new Subject<{ message: string, type: string }>();

    constructor() { 
    }

    static showAlert(message: string, type: string) {
        AlertService.alertSubject.next({ message, type });
        setTimeout(() => {
            AlertService.alertSubject.next({message:'', type:''});
        }, 2000);
    }

    static alertSuccess(message:string){
        AlertService.showAlert(message, 'success')
    }

    static alertDanger(message:string){
        AlertService.showAlert(message, 'danger')
    }

    static alertInfo(message:string){
        AlertService.showAlert(message, 'info')
    }


    onAlert() {
        return AlertService.alertSubject.asObservable();
    }

    hideAlert() {
        AlertService.alertSubject.next({ message: '', type: '' });
    }
}
