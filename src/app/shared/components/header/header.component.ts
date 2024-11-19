import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  isAuthenticated: boolean = false;
  user?: User;

  constructor(private router: Router) { }

  ngDoCheck(): void {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  ngOnInit(): void {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.isAuthenticated = false;
    this.router.navigate(['/auth/login']);
  }
}
