// These mirror UrlRequest / UrlResponse / UrlStatsResponse on the backend.
// The field names are the one guess this project makes — check them against
// your actual DTO classes and adjust here (this is the only file that
// should need it; every component consumes these types, not raw fetch calls).

export interface UrlRequest {
  originalUrl: string;
  customCode?: string;
}

export interface UrlResponse {
  shortUrl: string;
}

export interface UrlStatsResponse {
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
}

export interface Ticket {
  id: number;
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
}
