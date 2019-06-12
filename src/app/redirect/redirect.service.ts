import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: "root"
})
export class RedirectService {
  constructor(private http: HttpClient) {}
  reset_password(postData) {
    return this.http.post("http://localhost:3000/auth/reset-password",postData);
  }
}
