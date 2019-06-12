import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  

  constructor(private http: HttpClient) { }

  verifyToken(idToken) {
  return this.http.get(`http://localhost:3000/auth/verify/${idToken}`)
  }

  login(postdata){
    return this.http.post('http://localhost:3000/auth/login',postdata)
  }
}
