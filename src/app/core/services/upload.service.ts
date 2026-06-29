import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse, UploadResponse } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly http = inject(HttpClient);

  /**
   * Sube una imagen a AWS S3 y devuelve la URL pública.
   * El archivo debe ser jpeg, jpg, png, gif, webp o svg (máx 5MB).
   * Requiere cookie JWT.
   */
  uploadImage(file: File): Observable<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<ApiResponse<UploadResponse>>(
      API_ENDPOINTS.upload.image,
      formData,
      { withCredentials: true }
    );
  }
}
