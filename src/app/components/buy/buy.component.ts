import { Component, OnInit } from '@angular/core';
import {Lot, LotService} from '../../services/lot/lot.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  lots:Lot[] = this.lotService.getLots();
  categories:String[] = this.lotService.getCategories();

  constructor(private lotService:LotService) { }

  ngOnInit(): void {
  }

}
