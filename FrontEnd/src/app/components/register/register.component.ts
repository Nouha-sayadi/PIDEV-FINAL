import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: (res: any) => {
        alert('Compte créé avec succès');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        alert(err.error.error);
      }
    });
  }
}
