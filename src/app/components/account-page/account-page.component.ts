import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  public isCollapsedAcc: boolean;
  public isCollapsedHelp: boolean;
  public isCollapsedOrders: boolean;
  public accDetails: any;
  public userSub: Subscription;
  public phNo: Subscription;

  constructor(private apiservice: ApiService, private auth: AuthService) {
    this.isCollapsedAcc = true;
    this.isCollapsedHelp = true;
    this.isCollapsedOrders = true;
    this.accDetails = [];
  }

  ngOnInit(): void {
    this.userSub = this.apiservice.account.getUserDetails().subscribe((data: User) => {
      this.accDetails = data;
    if(this.accDetails.phone == null){
      this.phNo = this.apiservice.account.getPhoneNumber().subscribe((data: number) => {
        this.accDetails.phone = data + ' · '
      });
    }
    else{
      this.accDetails.phone += ' · '
    }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.auth.logout();
    if(this.phNo){
      this.phNo.unsubscribe();
    }
  }
}
