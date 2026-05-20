import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommentService } from '../../services/comments-service';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './comments.html',
  styleUrls: ['./comments.scss'],
  host: {
    'ngSkipHydration': 'true'
  }
})
export class Comments implements OnInit {

  comments: any[] = [];
  content = '';

  constructor(
    private commentService: CommentService,
    private cdr: ChangeDetectorRef  // ← AJOUT
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }
  loadComments(): void {
    this.commentService.getComments().subscribe(res => {
      this.comments = res;
      // Remplacer detectChanges() par markForCheck() — évite le NG0100
      this.cdr.markForCheck();
    });
  }

  addComment(): void {
    if (!this.content.trim()) return;
    this.commentService.createComment({ content: this.content })
      .subscribe(() => {
        this.content = '';
        this.loadComments();
      });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        // ← FIX : supprimer localement, pas de reload HTTP (évite le 404)
        this.comments = this.comments.filter(c => c.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur suppression:', err)
    });
  }
}
