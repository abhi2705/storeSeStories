import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/models';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {

  private subscription: Subscription;
  private brandID: number;

  constructor(private ren2: Renderer2,
              @Inject(DOCUMENT) private document,
              private api: ApiService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.brandID = this.route.snapshot.params.id;
    this.subscription = this.api.brands.get(this.brandID).subscribe((brand: Brand) => {
     this.loadScripts(brand.collectionId);
    });
  }

  private loadScripts(id: string) {
    const s1 = this.ren2.createElement('script');
    s1.type = 'text/javascript';
    s1.text = `const brandCollectionID = '${id}'`;
    this.ren2.appendChild(this.document.body, s1);
    const s2 = this.ren2.createElement('script');
    s2.type = 'text/javascript';
    s2.src = 'assets/js/shopify.js';
    s2.text = ``;
    this.ren2.appendChild(this.document.body, s2);
  }

}
