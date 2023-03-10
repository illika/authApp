import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    email: ["illika@email.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
  }

  ingresar() {
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).subscribe((resp) => {
      if(resp === true) {
        this.router.navigateByUrl("/dashboard");
      } else {
        Swal.fire({
          title: 'Error!',
          text: resp.msg,
          icon: 'error',
          confirmButtonText: 'Cool'
        })    
      }
    });
    //
  }

}
