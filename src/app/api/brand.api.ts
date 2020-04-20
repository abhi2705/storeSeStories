import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Brands, Brand } from '../models/brand.model';

export class BrandApi extends BaseApi {
  private endpointUrl: string;
  constructor(endpoint: string, baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
    this.endpointUrl = this.baseUrl + endpoint;
  }

  /**
   * Get a particular story or all stories.
   * @param [id] - The id of the story.
   * @returns An observable that must be subscribed to get the brand(s).
   */
  get(id?: number): Observable<Brands> {
    let urlParam = '';

    // Get all stories if idx is not given.
    if (id === undefined) {
      urlParam += 'all';
    } else {
      urlParam += id;
    }
    return this.http.get<Brands>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  /**
   * Activate a particular brand, given its brandId.
   * @param id - The brand id.
   * @returns An observable that must be subscribed to update the brand.
   */
  activate(id: number): Observable<Brand> {
    const urlParam = 'activate/' + id;
    return this.http.post<Brand>(this.endpointUrl + urlParam, {}, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  /**
   * Dectivate a particular brand, given its brandId.
   * @param id - The brand id.
   * @returns An observable that must be subscribed to update the brand.
   */
  deactivate(id: number): Observable<Brand> {
    const urlParam = 'deactivate/' + id;
    return this.http.post<Brand>(this.endpointUrl + urlParam, {}, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new brand in the backend.
   * @param brand - The new brand to be created.
   * @returns An observable that must be subscribed to update the brand.
   */
  save(brand: Brand): Observable<Brand> {
    const urlParam = 'save';
    return this.http.post<Brand>(this.endpointUrl + urlParam, brand, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }
}
