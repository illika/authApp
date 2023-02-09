import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthReponse, Usuario } from '../interfaces/auth.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthReponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem("token", resp.token!);
          //this._usuario = { name: resp.name!, uid: resp.uid!, email };
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set("x-token", localStorage.getItem("token") ?? "");

    return this.http.get<AuthReponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem("token", resp.token!);
          this._usuario = { name: resp.name!, uid: resp.uid!, email: resp.email };
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

  registrarUsuario(usuario: Usuario) {
    // email: string, name: string, password: string
    const url = `${this.baseUrl}/auth/new`;
    //const body = { email, name, password };

    return this.http.post<AuthReponse>(url, usuario).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem("token", resp.token!);
          //this._usuario = { name: resp.name!, uid: resp.uid!, email: resp.email };
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error))
    );
  }
}
