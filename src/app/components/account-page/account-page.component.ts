import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  public isCollapsedAcc = true;
  public isCollapsedHelp = true;
  public isCollapsedOrders = true;
  private logoutSubscription = Subscription;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
  }

  logout(){
    this.apiservice.auth.logout().subscribe((data : any)=> {
      console.log(data)
    });
  }
  ngOnDestroy() : void {

  }


}
