// Respuesta al subir una imagen
export interface UploadResponse {
  url: string;
  key: string;
  originalName: string;
  size: number;
  mimetype: string;
}
