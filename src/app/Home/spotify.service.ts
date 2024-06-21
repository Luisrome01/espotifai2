// spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = '07ef288afade491db9f20b58d12e6e25';
  private clientSecret = '643e1e120e144d24b6a3644be1fa5dc0';
  private accessToken: string | null = null;
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(private http: HttpClient) {}

  private fetchAccessToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    const body = 'grant_type=client_credentials';

    return this.http.post(this.tokenUrl, body, { headers }).pipe(
      switchMap((tokenResponse: any) => {
        const token = tokenResponse.access_token;
        if (token) {
          this.accessToken = token;
          return of(token);
        } else {
          return throwError('Invalid access token');
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private getAccessToken(): Observable<string> {
    if (this.accessToken) {
      return of(this.accessToken);
    } else {
      return this.fetchAccessToken();
    }
  }

  getNewReleases(offset: number, limit: number): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token) => {
        const url = `https://api.spotify.com/v1/browse/new-releases?offset=${offset}&limit=${limit}`;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });
  
        return this.http.get(url, { headers }).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  getPopularArtists(offset: number = 0, limit: number = 20): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token) => {
        const url = `https://api.spotify.com/v1/artists?offset=${offset}&limit=${limit}`;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });
  
        return this.http.get(url, { headers }).pipe(
          catchError(this.handleError)
        );
      })
    );
  }
  
  getArtists(artistIds: string[]): Observable<any> {
    if (artistIds.length === 0) {
      return of({ artists: [] });
    }
  
    const ids = artistIds.join(',');
    return this.getAccessToken().pipe(
      switchMap((token) => {
        const url = `https://api.spotify.com/v1/artists?ids=${ids}`;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });
  
        return this.http.get(url, { headers }).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  searchArtists(query: string, offset: number = 0, limit: number = 20): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token) => {
        const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&offset=${offset}&limit=${limit}`;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });
  
        return this.http.get(url, { headers }).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  getAlbumTracks(albumId: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token) => {
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });

        return this.http.get(url, { headers }).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
