import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  miFormulario: FormGroup = this.fb.group({
    email: ["illika@email.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.miFormulario.value);
    this.router.navigateByUrl("/dashboard");
  }

}
