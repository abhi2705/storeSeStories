import { Component, OnInit, OnDestroy } from '@angular/core';
import { Orders } from '../../models/order.model';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<Orders>;
  private sub: Subscription;
  all_orders = [];

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.orders$ = this.apiservice.account.getMyOrders();
    this.sub = this.orders$.subscribe((data: Orders) => {
      console.log(data);
      this.all_orders = data.orders;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getItemName(i) {
    var order = this.all_orders[i];
    var line_items = order.line_items;
    var name = line_items[0].name;
    var len = line_items.length;
    // console.log(name);
    if(len == 1){
      return name;
    }
    else {
      return name + " +" + (len - 1).toString();
    }
  }

  getProductStatus(i) {
    var order = this.all_orders[i];
    var status = order.fulfillment_status;
    if(status == null) {
      return "Pending";
    }
    else {
      return status;
    }
  }

  getItemImage(i) {
    var order = this.all_orders[i];
    var item = order.line_items[0];
    return "";
  }

}
