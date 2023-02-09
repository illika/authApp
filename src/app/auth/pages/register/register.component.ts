import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
  }

  registrar() {
    this.authService.registrarUsuario(this.miFormulario.value)
      .subscribe((resp) => {
        if (resp === true) {
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
  }

}
