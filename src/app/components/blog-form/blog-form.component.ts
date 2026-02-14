import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./blog-form.html`
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
