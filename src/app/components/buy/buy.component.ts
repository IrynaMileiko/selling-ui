import { Component, OnInit } from '@angular/core';
import {LotExt, LotService, Filter} from '../../services/lot/lot.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  hasNextPage: boolean = true;
  lots:LotExt[];
  categories:Category[] = this.getCategories();
  search:string="";
  minPrice:number|null=null;
  maxPrice:number|null=null;
  filter:Filter;
  negativePrice:Boolean=false;
  incorrectPrice:Boolean=false;
  sortColumn:string;
  isDirect:boolean;
  currentPage: number;
  pageSize: number;

  constructor(private lotService:LotService, private toastr: ToastrService, private router: Router, private titleService: Title) {
    titleService.setTitle('Buy');
    this.lots=[];
    //this.getLots();
    this.filter={
      sortCol:"NAME",
      direct:true,
      categories:[],
      search:"",
      minPrice:-1,
      maxPrice:-1
    }
    this.currentPage = 0;
    this.pageSize = 5;
    this.sortColumn=this.filter.sortCol;
    this.isDirect=this.filter.direct;
    this.sortCol('Name A');
   }

  ngOnInit(): void {
  }


  getCategories(){
    let cat:string[] = this.lotService.getCategories();
    let categories:Category[] = [];
    for(let ind in cat){
      let category:Category = {
        name:cat[ind],
        isChecked:false
      };
      categories.push(category);
    }
    return categories;
  }

  sortCol(sel:string){
    //this.lots = this.lotService.sortLots(this.lots, sel);
    let cols = sel.split(' ');
    let col = cols[0];
    let dir = cols[1];
    this.sortColumn = col;
    this.isDirect = dir=='A'?true:false;
    this.filter.sortCol=this.sortColumn;
    this.filter.direct=this.isDirect;
    //this.lots = this.lotService.filtrate(this.filter);
    this.lots = this.lotService.filtrateWithPage(this.filter, this.currentPage, this.pageSize);
  }

  getLots(){
    this.lots=[];
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

  filtrate(){
    this.currentPage = 0;
    this.loadLotsByFilter();
  }

  loadLotsByFilter(){
    this.lots=[];
    if(!this.checkPrice()) return;

    this.filter={
      sortCol:this.sortColumn,
      direct:this.isDirect,
      categories:this.getSelectedCategories(),
      search:this.search,
      minPrice:this.minPrice==null?-1:this.minPrice,
      maxPrice:this.maxPrice==null?-1:this.maxPrice
    }

    //this.lots = this.lotService.filtrate(this.filter);
    this.lots = this.lotService.filtrateWithPage(this.filter, this.currentPage, this.pageSize);

  }

  getSelectedCategories(){
    let categories:string[]=[];
    for(let ind in this.categories){
      if(this.categories[ind].isChecked){
        categories.push(this.categories[ind].name);
      }
    }
    return categories;
  }

  checkPrice(){
    if(this.minPrice==null){
      if(this.maxPrice!=null){
        if(this.maxPrice<0){
          this.negativePrice=true;
          return false;
        }
      }
      return true;
    }
    if(this.maxPrice==null){
      if(this.minPrice<0){
        this.negativePrice=true;
        return false;
      }
      return true;
    }
    if(this.minPrice<0||this.maxPrice<0){
      this.negativePrice=true;
      return false;
    }
    if(this.minPrice>this.maxPrice){
      this.incorrectPrice=true;
      return false;
    }

    return true;
  }

  clearPriceWarning(){
    this.incorrectPrice=false;
    this.negativePrice=false;
  }

  clearCategories(){
    for(let ind in this.categories){
      if(this.categories[ind].isChecked){
        this.categories[ind].isChecked=false;
      }
    }
    this.filter.categories=[];
  }

  clearSearch(){
    this.search="";
    this.filter.search="";
  }

  clearPrice(){
    this.minPrice=null;
    this.maxPrice=null;
    this.filter.minPrice=-1;
    this.filter.maxPrice=-1;
  }

  clearAll(){
    this.clearCategories();
    this.clearSearch();
    this.clearPrice();
    this.filtrate();
  }

  successToaster(msg:string) {
    this.toastr.success(msg, 'Success!', {
      positionClass: 'toast-bottom-right'
    });
  }

  loadNextPage(){
    this.currentPage++;
    this.loadLotsByFilter();
  }

  loadPrevPage(){
    this.currentPage--;
    this.loadLotsByFilter();
  }
}

interface Category{
  name:string,
  isChecked:Boolean
}
