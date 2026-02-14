import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, BlogCardComponent, RouterLink],
  template: `
    <h1>Welcome to My Blog</h1>
    <p>
      This blog documents my journey, technical insights, and experiences.
    </p>

    <a routerLink="/blogs" class="btn">View All Blogs</a>

    <section *ngIf="latestBlog">
      <h2>Latest Blog</h2>
      <app-blog-card [blog]="latestBlog"></app-blog-card>
    </section>
  `,
  styles: [`.btn { display:inline-block; margin:1rem 0; }`]
})
export class LandingComponent implements OnInit {

  latestBlog?: Blog;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getLatest().subscribe(blog => {
      this.latestBlog = blog;
    });
  }
}
