import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Tentative de connexion avec:', this.form.value);
      this.authService.login(this.form.value).subscribe({
        next: (res: any) => {
          console.log('Connexion réussie', res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === 401) {
            alert('Email ou mot de passe incorrect.');
          } else {
            alert('Erreur serveur, veuillez réessayer plus tard.');
          }
          console.error('Erreur de connexion', err);
        }
      });
    }
  }
}
