import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

// Check if is logged, calling this inside route, for security
export const authGuard: CanActivateFn = (route, state) => {
  // Injector checks its registry to see if there is an instance already available there. 
  // If not, a new instance is created and stored in the registry.
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuthenticated())
    return true;
  else{
    alert("Login before")
    router.navigate(['/login']);
    return false;
  }
    
};
