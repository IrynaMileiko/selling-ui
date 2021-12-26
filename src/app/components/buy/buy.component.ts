import { Component, OnInit } from '@angular/core';
import {LotExt, LotService} from '../../services/lot/lot.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  lots:LotExt[];
  categories:String[] = this.lotService.getCategories();

  constructor(private lotService:LotService, private toastr: ToastrService, private router: Router, private titleService: Title) {
    titleService.setTitle('Buy');
    this.lots=[];
    this.getLots();
    this.sortCol('Rating A');
   }

  ngOnInit(): void {
  }


  sortCol(sel:string){
    this.lots = this.lotService.sortLots(this.lots, sel);
  }

  getLots(){
    this.lotService.getBuyableLots().subscribe(
      (response) => {
        //console.log(response);
        let st = JSON.stringify(response);
        let res = JSON.parse(st);
        //console.log(Object.values(res));
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            let lot:LotExt|null = this.lotService.getJLot(JSON.stringify(res[key]));
            if(lot!=null)
              this.lots.push(lot);
          }
        }
        //console.log(this.lots);
        //this.myLots = Array.of(res.json().results);
      },
      (error) => {
        console.log(error);
        this.lots = [];
      });
  }

  viewLot(id:Number){
      this.router.navigate(['/lots/'+id]);
  }

  successToaster(msg:string) {
    this.toastr.success(msg, 'Success!', {
      positionClass: 'toast-bottom-right'
    });
  }
}
