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
  templateUrl: './blog.html'
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = [];
  tagFilter = '';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs(); // load all blogs immediately
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
    this.tagFilter = ''; // optional: clear filter
    this.loadBlogs();    // refresh the blog list
  }
}
