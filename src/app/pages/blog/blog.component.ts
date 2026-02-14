import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, BlogCardComponent, BlogFormComponent, FormsModule],
  template: `
    <h1>Blog Posts</h1>

    <div class="filter">
      <input
        placeholder="Filter by tag"
        [(ngModel)]="tagFilter"
      />
      <button (click)="loadBlogs()">Filter</button>
      <button (click)="clearFilter()">Clear</button>
    </div>

    <app-blog-form (blogCreated)="onBlogCreated()"></app-blog-form>

    <div *ngFor="let blog of blogs">
      <app-blog-card [blog]="blog"></app-blog-card>
    </div>
  `
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = [];
  tagFilter = '';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs(this.tagFilter).subscribe(data => {
      this.blogs = data;
    });
  }

  clearFilter() {
    this.tagFilter = '';
    this.loadBlogs();
  }

  onBlogCreated() {
    this.loadBlogs();
  }
}
