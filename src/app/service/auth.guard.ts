import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).getUser())
    return true;

  inject(Router).navigateByUrl('/login')
  return false;


};
