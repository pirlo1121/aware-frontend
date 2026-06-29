import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse, ApiListResponse } from '../interfaces';
import {
  Subscriber,
  SubscriberCreated,
  CreateSubscriberPayload,
} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class SubscriberService {
  private readonly http = inject(HttpClient);

  /**
   * Registra un nuevo suscriptor. Endpoint público.
   */
  subscribe(payload: CreateSubscriberPayload): Observable<ApiResponse<SubscriberCreated>> {
    return this.http.post<ApiResponse<SubscriberCreated>>(
      API_ENDPOINTS.subscribers.create,
      payload
    );
  }

  /**
   * Lista todos los suscriptores. Solo admin.
   */
  getSubscribers(): Observable<ApiListResponse<Subscriber>> {
    return this.http.get<ApiListResponse<Subscriber>>(
      API_ENDPOINTS.subscribers.list,
      { withCredentials: true }
    );
  }

  /**
   * Pausa un suscriptor (status → "paused"). Solo admin.
   */
  pauseSubscriber(id: string): Observable<ApiResponse<Subscriber>> {
    return this.http.patch<ApiResponse<Subscriber>>(
      API_ENDPOINTS.subscribers.pause(id),
      {},
      { withCredentials: true }
    );
  }

  /**
   * Activa un suscriptor (status → "active"). Solo admin.
   */
  activateSubscriber(id: string): Observable<ApiResponse<Subscriber>> {
    return this.http.patch<ApiResponse<Subscriber>>(
      API_ENDPOINTS.subscribers.activate(id),
      {},
      { withCredentials: true }
    );
  }

  /**
   * Elimina un suscriptor permanentemente. Solo admin.
   */
  deleteSubscriber(
    id: string
  ): Observable<ApiResponse<Record<string, never>>> {
    return this.http.delete<ApiResponse<Record<string, never>>>(
      API_ENDPOINTS.subscribers.delete(id),
      { withCredentials: true }
    );
  }
}
