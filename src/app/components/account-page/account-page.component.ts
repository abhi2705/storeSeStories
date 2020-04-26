import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  public isCollapsedAcc = true;
  public isCollapsedHelp = true;
  public isCollapsedOrders = true;
  public accDetails: User;

  constructor(private apiservice: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.apiservice.account.getUserDetails().subscribe((data: User) => {
      this.accDetails = data;
    });

  }

  ngOnDestroy(): void {

  }

  onLogout(): void {
    this.auth.logout();
  }

}
