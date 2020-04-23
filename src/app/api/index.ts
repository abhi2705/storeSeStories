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
import { BlogApi } from './blog.api';

const ApiList = [
  {name: 'stories', endpoint: 'story/', class: StoryApi},
  {name: 'brands', endpoint: 'brand/', class: BrandApi},
  {name: 'auth', endpoint: 'auth/', class: AuthApi},
  {name: 'blogs', endpoint: 'blog/', class: BlogApi}
];


class Api {
  stories: StoryApi;  // attribute name and type same as the corresponding entry in ApiList.
  brands: BrandApi;
  auth: AuthApi;
  blogs: BlogApi;
}

export { ApiList, Api };
