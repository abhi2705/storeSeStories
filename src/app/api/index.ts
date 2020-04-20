/*
This file exports the api declarations which are then used by
the ApiService. When adding a new Api, add an entry in both,
the ApiList, and the Api class.
Important: The name defined for each api in ApiList must be the
same as the attribute name in Api class.
*/

import { BrandApi } from './brand.api';
import {StoryApi } from './story.api';
import { AuthApi } from './auth.api';

const ApiList = [
  {name: 'stories', endpoint: 'story/', class: StoryApi},
  {name: 'brands', endpoint: 'brand/', class: BrandApi},
  {name: 'auth', endpoint: 'auth/', class: AuthApi}
];


class Api {
  stories: StoryApi;  // attribute name and type same as the corresponding entry in ApiList.
  brands: BrandApi;
  auth: AuthApi;
}

export { ApiList, Api };
