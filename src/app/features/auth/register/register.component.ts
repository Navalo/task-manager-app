import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  // constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  //   this.registerForm = this.fb.group({
  //     username: ['', [Validators.required,]],
  //     password: ['', [Validators.required, Validators.minLength(4)]],
  //     confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  //   }, { validators: this.passwordMatcher });
  // }

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
      },
      { validators: this.passwordMatcher }
    );
  }

  passwordMatcher(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const { username, password } = this.registerForm.value;
    this.authService.register(username, password).subscribe({
      next: (response: any) =>{
        if (response.success) {
          this.toastr.success("Registration Successful");
          this.router.navigate(['/auth/login']);
        } else {
          this.errorMessage = response.message || 'Registration failed!';
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.errorMessage = 'An error occurred during registration.';
        this.toastr.error(this.errorMessage);
      }
    }
    );
  }
}
