import { ChangeDetectionStrategy, Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PostService } from '../../../core/services/post.service';
import { PostSummary } from '../../../core/interfaces';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly destroyRef = inject(DestroyRef);

  readonly posts = signal<PostSummary[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly deletingId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.postService.getPosts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.posts.set(response.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los posts.');
        this.isLoading.set(false);
      },
    });
  }

  deletePost(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este post? Esta acción no se puede deshacer.')) return;

    this.deletingId.set(id);

    this.postService.deletePost(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.posts.update((posts) => posts.filter((post) => post._id !== id));
        this.deletingId.set(null);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(error.error?.error ?? 'Error al eliminar el post.');
        this.deletingId.set(null);
      },
    });
  }
}
