import { Component, OnInit, Renderer2, OnDestroy, ViewChild, TemplateRef, AfterViewInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models';
import { Subscription, Observable } from 'rxjs';
import { Blogs } from 'src/app/models/blog.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: Subscription;
  private brandID: number;
  active = 1;
  brand: Brand;
  blogs$: Observable<Blogs>;
  @ViewChild('cat') catalogTemplate: TemplateRef<any>;
  @ViewChild('blog') blogTemplate: TemplateRef<any>;
  activeTemplate: TemplateRef<any>;

  constructor(private api: ApiService,
              private ren2: Renderer2,
              @Inject(DOCUMENT) private document,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.brandID = this.route.snapshot.params.id;
    this.subscription = this.api.brands.get(this.brandID).subscribe((brand: Brand) => {
      this.brand = {...brand};
      this.loadScripts(brand.collectionId);
    });
    console.log(this.activeTemplate);
    this.blogs$ = this.api.blogs.getBlogsByBrandId(this.brandID);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.activeTemplate = this.catalogTemplate;
  }
  changeTabTo(tab: number) {
    this.active = tab;
    switch (tab) {
      case 1:
        this.activeTemplate = this.catalogTemplate;
        this.loadScripts(this.brand.collectionId);
        break;
      case 2:
        this.activeTemplate = this.blogTemplate;
        break;
    }
  }

  private loadScripts(id: string) {
    const s1 = this.ren2.createElement('script');
    s1.type = 'text/javascript';
    s1.text = `if(brandCollectionID) brandCollectionID = '${id}'
    else { var brandCollectionID = '${id}'}`;
    this.ren2.appendChild(this.document.body, s1);
    const s2 = this.ren2.createElement('script');
    s2.type = 'text/javascript';
    s2.src = 'assets/js/shopify.js';
    s2.text = ``;
    this.ren2.appendChild(this.document.body, s2);
  }

}
