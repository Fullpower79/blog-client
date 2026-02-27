import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, BlogCardComponent, BlogFormComponent, FormsModule],
  templateUrl: './blog.html'
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = [];
  tagFilter = '';
  loading = false;
  errorMessage = '';

  constructor(private blogService: BlogService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // try to fetch right away; if the HTTP client isn't ready this will fail silently,
    // so we also expose a manual button below for users to retry.
    this.loadBlogs();
  }

  loadBlogs(): void {
    // guard early; if user keeps clicking we don't want overlapping requests
    if (this.loading) {
      return;
    }

    this.loading = true;
    console.log('loading blogs, tagFilter=', this.tagFilter);

    this.blogService.getBlogs(this.tagFilter).subscribe({
      next: data => {
        this.blogs = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error loading blogs', err);
        this.errorMessage = 'Failed to load blogs. Please check your connection or try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  clearFilter() {
    this.tagFilter = '';
    this.loadBlogs();
  }

  onBlogCreated() {
    this.tagFilter = ''; 
    this.loadBlogs();    
  }
}
