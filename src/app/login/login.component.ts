import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angular-6-social-login";
import { RedirectComponent } from "../redirect/redirect.component";
import { HttpClient } from "@angular/common/http";
import { LoginServiceService } from "./login-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    public router: Router,
    private socialAuthService: AuthService,
    private http: HttpClient,
    private LoginService: LoginServiceService
  ) {}

  username: string;
  password: string;
  error: string;
  login_response;
  Response;
  ngOnInit() {}
  login(): void {
    const postdata = { username: this.username, password: this.password };
    this.LoginService.login(postdata).subscribe(response => {
      console.log(response);
      this.Response = response;
      if (this.Response.status == "success") {
        this.router.navigate(["/redirect"]);
        localStorage.setItem("user", JSON.stringify(this.Response.user));
      }
    });
  }

  gmailLogin(socialPlatform: string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    console.log(socialPlatformProvider);
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      console.log(socialPlatform + " sign in data : ", userData);

      this.verifyToken(userData.idToken);
    });
  }

  verifyToken(idToken) {
    this.LoginService.verifyToken(idToken).subscribe(res => {
      console.log(res);
      this.login_response = res;
      if (this.login_response.status == "success") {
        localStorage.setItem("user", JSON.stringify(this.login_response.user));
        this.router.navigate(["/redirect"]);
      } else {
        this.error = this.login_response.msg;
      }
    });
  }
}
