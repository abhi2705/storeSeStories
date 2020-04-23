import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  public isCollapsedAcc = true;
  public isCollapsedHelp = true;
  public isCollapsedOrders = true;

  constructor() { }

  ngOnInit(): void {
  }

}
