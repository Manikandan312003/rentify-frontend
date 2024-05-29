import { Injectable, APP_INITIALIZER } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {

    constructor(private userService: UserService, private router:Router) { }

    initializeApp(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const token = this.userService.getToken();
            if (token) {
                this.userService.getUserfromToken(token).subscribe(
                    user => {
                        this.userService.setUser(user);
                        resolve();
                    },
                    err => {
                        if(err.status==401){
                            localStorage.removeItem('token')
                        }
                        console.error(err);
                        resolve();
                    }
                );
            } else {
                resolve();
            }
        });
    }
}


export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.initializeApp();
}

