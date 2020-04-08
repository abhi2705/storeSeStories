
import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-view-all-brands',
  templateUrl: './view-all-brands.component.html',
  styleUrls: ['./view-all-brands.component.scss']
})
export class ViewAllBrandsComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }
  openBottomSheet(): void {
    this._bottomSheet.open(ViewAllBrandsComponentSheet);
  }
  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-view-all-brands-sheet',
  templateUrl: './view-all-brands-sheet.component.html',
  styleUrls: ['./view-all-brands-sheet.component.scss']
})
export class ViewAllBrandsComponentSheet{
  numbers;
  constructor(private _bottomSheetRef: MatBottomSheetRef<ViewAllBrandsComponentSheet>) {
    this.numbers = Array(20).fill(0).map((x,i)=>i);
  }

  openLink(event: MouseEvent): void{
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

