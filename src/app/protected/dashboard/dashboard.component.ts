import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    * {
      margin: 15px;
    }
  `
  ]
})
export class DashboardComponent implements OnInit {

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigateByUrl("/auth");
  }

}
