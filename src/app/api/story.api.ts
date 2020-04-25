/*
This class contains calls to the stories api endpoints
*/

import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Stories, Story } from '../models/story.model';

export class StoryApi extends BaseApi {
  private endpointUrl: string;
  constructor(endpoint: string, baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
    this.endpointUrl = this.baseUrl + endpoint;
  }

  /**
   * Get a particular story or all stories.
   * @param [id] - The id of the story.
   * @return An observable that must be subscribed to get the story/stories.
   */
  get(id?: number): Observable<Stories> {
    let urlParam = '';

    // Get all stories if id is not given.
    if (id === undefined) {
      urlParam += 'all';
    } else {
      urlParam += id;
    }

    return this.http.get<Stories>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new story in the backend.
   * @param story - The new story to be created.
   * @returns An observable that must be subscribed to create the story.
   */
  save(story: Story) {
    const urlParam = 'save';
    return this.http.post<Story>(this.endpointUrl + urlParam, story, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  like(storyId: number) {
    const urlParam = "like/" + storyId;
    return this.http.post<number>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  unlike(storyId: number) {
    const urlParam = "unlike/" + storyId;
    return this.http.post<number>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  isliked(storyId: number): Observable<Boolean> {
    const urlParam = "isliked/" + storyId;
    return this.http.get<Boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

}
