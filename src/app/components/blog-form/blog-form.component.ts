import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Create New Blog</h2>

    <form (ngSubmit)="submit()">
      <input
        type="text"
        placeholder="Title"
        [(ngModel)]="title"
        name="title"
        required
      />

      <textarea
        placeholder="Content"
        [(ngModel)]="content"
        name="content"
        required
      ></textarea>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        [(ngModel)]="tags"
        name="tags"
      />

      <input
        type="file"
        (change)="onFileSelected($event)"
      />

      <button type="submit">Publish</button>
    </form>
  `
})
export class BlogFormComponent {

  @Output() blogCreated = new EventEmitter<void>();

  title = '';
  content = '';
  tags = '';
  selectedFile!: File;

  constructor(private blogService: BlogService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    formData.append('tags', this.tags);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.blogService.createBlog(formData).subscribe(() => {
      this.title = '';
      this.content = '';
      this.tags = '';
      this.blogCreated.emit();
    });
  }
}
