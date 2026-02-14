import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <a routerLink="/">Home</a>
      <a routerLink="/blogs">Blogs</a>
      <a routerLink="/about">About</a>
    </nav>

    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      padding: 1rem;
      background: #111;
    }
    .navbar a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
    }
    .container {
      padding: 2rem;
      max-width: 1000px;
      margin: auto;
    }
  `]
})
export class AppComponent {}
