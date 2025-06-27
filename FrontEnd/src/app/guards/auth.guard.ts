import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = this.decodeJwt(token);

        if (decoded.role === 'ADMIN') {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      } catch (error) {
        console.error('JWT decode failed:', error);
        this.router.navigate(['/login']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
