import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/user/dashboard']);
    }
  }

  ngOnInit(): void {
  }
}
