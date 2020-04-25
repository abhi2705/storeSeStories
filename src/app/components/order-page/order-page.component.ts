import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  order$: Observable<Order>;
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order$ = this.api.account.getOrder(this.route.snapshot.params.id);
  }
}
