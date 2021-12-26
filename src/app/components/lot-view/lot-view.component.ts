import { Component, OnInit } from '@angular/core';
import {LotExt, LotService} from '../../services/lot/lot.service';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lot-view',
  templateUrl: './lot-view.component.html',
  styleUrls: ['./lot-view.component.css']
})
export class LotViewComponent implements OnInit {
id:number;
lot:LotExt|null = null;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private lotService:LotService,
        public datepipe: DatePipe, private titleService: Title) {
    titleService.setTitle('View lot');
    let smth = this.activateRoute.snapshot.params['id'];
    if(isNaN(smth)){
      this.router.navigate(['/unknown']);
    }
    this.id = smth;
    this.getLot(this.id);
   }

   getLot(id:number){
     this.lotService.getBuyableLotById(id).subscribe(
       (response) => {
         this.lot = this.lotService.getJLot(JSON.stringify(response));
         if(this.lot==null)
            this.router.navigate(['/unknown']);
       },
       (error) => {
         console.log(error);
         this.lot = null;
        this.router.navigate(['/unknown']);
       });
   }

  ngOnInit(): void {
  }

  getText(text:String){
    if(text==''||text==null){
      return '*No information*';
    }
    else{
      return text;
    }
  }

}
