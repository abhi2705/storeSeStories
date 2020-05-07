// This service cahes all GET requests to the backend API.

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor {
  private cache: RequestCache;
  constructor() {
    this.cache = new RequestCache();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Don't cache if request is to the auth controller.
    if (/api\/auth/.test(req.url)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse)  : next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(req, event);
        }
      })
    );
  }
}

interface CacheData {
  res: HttpResponse<any>;
  lastFetched: number;
}

class RequestCache {

  private cacheData = new Map<string, CacheData>();
  private controllerUpdatedAt = new Map<string, number>();
  private readonly maxAge = 60000;

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const controllers = this.getControllersFromUrl(url);
    const time = Date.now();

    // Cache only GET requests.
    if (req.method !== 'GET') {
      // Invalidate all cached entries of resources may be modified by this requet.
      // Done by maintaining the most recent time when the resource was updated.
      controllers.forEach(c => this.controllerUpdatedAt.set(c, time));
      return undefined;
    }

    const cached = this.cacheData.get(url);
    if (!cached) {
      // No entry found.
      return undefined;
    }

    const controllerUpdates = controllers.reduce((p, c) => {
      const v = this.controllerUpdatedAt.get(c);
      return Math.min(p, (v ? v : 0));
    }, time + 1);
    // The cache entry is expired if:
    // 1. It has lived longer than the max allowed age - maxAge. OR
    // 2. There was a write request (POST, PUT, DELETE, etc.) to any of the resources that
    // this request refers to after the cache entry was saved.
    const isExpired = (cached.lastFetched < (time - this.maxAge) ||
    cached.lastFetched < controllerUpdates);

    if (isExpired) {
      this.cacheData.delete(url);
      return undefined;
    }

    return cached.res;
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { res, lastFetched: Date.now() };
    this.cacheData.set(url, entry);
  }

  private getControllersFromUrl(url: string): string[] {
    // Get all resources the url refers to. Done by observing the pattern of urls.
    // Should be updated as and when there are major changes in the backend api.
    const endpoints = url.split('/').splice(4);
    const controllers = [endpoints[0]];
    if (endpoints.some(e => /like|unlike|bookmark|unbookmark/.test(e))) {
      controllers.push('account');
    }
    return controllers;
  }
}
