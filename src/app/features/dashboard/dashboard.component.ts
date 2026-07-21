import { ChangeDetectionStrategy, Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { forkJoin, of, catchError } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { PostService } from '../../core/services/post.service';
import { SubscriberService } from '../../core/services/subscriber.service';

interface DashboardStats {
  publishedCount: number;
  draftCount: number;
  activeSubscribers: number;
  totalSubscribers: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  private readonly subscriberService = inject(SubscriberService);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentUser = this.authService.currentUser;
  readonly isLoadingStats = signal(true);
  readonly stats = signal<DashboardStats>({
    publishedCount: 0,
    draftCount: 0,
    activeSubscribers: 0,
    totalSubscribers: 0,
  });

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    forkJoin({
      posts: this.postService.getPosts().pipe(catchError(() => of(null))),
      drafts: this.postService.getDrafts().pipe(catchError(() => of(null))),
      subscribers: this.subscriberService.getSubscribers().pipe(catchError(() => of(null))),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ posts, drafts, subscribers }) => {
        this.stats.set({
          publishedCount: posts?.count ?? 0,
          draftCount: drafts?.count ?? 0,
          activeSubscribers: subscribers?.data.filter((s) => s.status === 'active').length ?? 0,
          totalSubscribers: subscribers?.data.length ?? 0,
        });
        this.isLoadingStats.set(false);
      });
  }

  get initials(): string {
    const name = this.currentUser()?.name ?? '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join('');
  }
}
