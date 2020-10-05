import { Component, OnInit, Input } from '@angular/core';
import { UniversalService } from '~/services/universal.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class CustomActionBarComponent implements OnInit {

  @Input("header") header:string = "";
  @Input("showBackButton") showBackButton:boolean = false;
  canGoBack:boolean = false;
  constructor(private router:RouterExtensions,
    private universalService:UniversalService
    ) { }

  ngOnInit(): void {
    this.canGoBack = this.router.canGoBack();
  }

  onDrawerButtonTap(): void {
    this.universalService.toggleDrawer();
  }

  onBackPressed(){
    if(this.canGoBack){
      this.router.backToPreviousPage();
    }
  }

}