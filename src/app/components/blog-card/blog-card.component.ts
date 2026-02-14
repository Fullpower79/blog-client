import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./blog-card.html`,
  styles: [`
    .card { border:1px solid #ddd; padding:1rem; margin-bottom:1rem; }
    img { max-width:100%; margin:1rem 0; }
    .tags span { margin-right:0.5rem; color:#555; }
  `]
})
export class BlogCardComponent {

  @Input() blog!: Blog;

  get imageUrl() {
    return `https://your-backend-url.onrender.com/uploads/${this.blog.image}`;
  }
}
