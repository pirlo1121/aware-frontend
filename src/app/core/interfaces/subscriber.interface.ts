export type SubscriberStatus = 'active' | 'paused';

// Suscriptor completo
export interface Subscriber {
  _id: string;
  name: string;
  email: string;
  status: SubscriberStatus;
  createdAt: string;
  updatedAt: string;
}

// Payload para registrarse como suscriptor
export interface CreateSubscriberPayload {
  name: string;
  email: string;
}

// Respuesta al crear un suscriptor
export interface SubscriberCreated {
  id: string;
  name: string;
  email: string;
  status: SubscriberStatus;
}
