import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RedirectService } from './redirect.service'

@Component({
  selector: "app-redirect",
  templateUrl: "./redirect.component.html",
  styleUrls: ["./redirect.component.scss"]
})
export class RedirectComponent implements OnInit {
  constructor(public router: Router,public redirect: RedirectService) {}
  user;
  email;
  name;
  user_id;
  password='';
  ngOnInit() {
    console.log(localStorage)
    this.user = JSON.parse(localStorage.getItem("user"));
    this.name = this.user.name
    this.email = this.user.email;
    this.user_id = this.user.id;
  }
  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }
  resetPassword() {
    console.log('password',this.password)
    const postData = {password: this.password, userid: this.user_id}
    this.redirect.reset_password(postData).subscribe(response => {
      console.log(response)
    })
  }
}
