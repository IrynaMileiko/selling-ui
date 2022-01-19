import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  categories: string[] = ["Toys", "Electronic devices", "Furniture", "Decoration"];
  lots: Lot[] = [
    {
      id: 1,
      name: "lot1",
      description: "important description",
      category: "Furniture",
      photo: "",
      startPrice: 1003,
      endPrice: 500,
      startDate: "2020-09-11",
      endDate: "2021-09-11",
      location: "Odessa"
    },
    {
      id: 2,
      name: "lot2",
      description: "important description2",
      category: "Toys",
      photo: "",
      startPrice: 103,
      endPrice: 50,
      startDate: "2020-09-11",
      endDate: "2021-09-11",
      location: "Odessa"
    },
    {
      id: 3,
      name: "lot3",
      description: "important description3333",
      category: "Toys",
      photo: "",
      startPrice: 103,
      endPrice: 50,
      startDate: "2020-09-11",
      endDate: "2021-09-11",
      location: "Odessa"
    }
  ];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('lots') == null) {
      localStorage.setItem('lots', JSON.stringify(this.lots));
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }
  }

  getLots() {
    return JSON.parse(localStorage.getItem("lots")!);
  }
  getCategories() {
    return this.categories;
  }
  setLots(lots: Lot[]) {
    localStorage.setItem('lots', JSON.stringify(lots));
  }
  setCategories(categories: String[]) {
    localStorage.setItem('lots', JSON.stringify(categories));
  }

  getLotById(id: number) {
    let lots = this.getLots();
    for (let i = 0; i < lots.length; ++i) {
      if (lots[i].id == id) {
        return lots[i];
      }
    }
    return null;
  }

  getMaxId() {
    let lots = this.getLots();
    let ma = 0;
    for (let i = 0; i < lots.length; ++i) {
      if (lots[i].id > ma) {
        ma = lots[i].id;
      }
    }
    return ma;
  }


  addLot2(lot: Lot) {
    let url = 'http://localhost:8081/api/lots/createLot';
    let token = localStorage.getItem('token');
    if (token == null) token = "";
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', token)
    }
    this.http.post<Response>(url, lot, header).subscribe((response) => {
      console.log(response.status)
    })

  }


  addLot(lot: Lot) {
    let lots = this.getLots();
    lots.push(lot);
    this.setLots(lots);
  }
  updateLot(lot: Lot, id: number) {
    let lots = this.getLots();
    for (let i = 0; i < lots.length; ++i) {
      if (lots[i].id == id) {
        lots[i] = lot;
        this.setLots(lots);
        break;
      }
    }
  }

  filtrate(filter: Filter) {
    console.log(filter);
    let lots: LotExt[] = [];

    this.filterBuyableLots(filter).subscribe(
      (response) => {
        console.log(response);
        let st = JSON.stringify(response);
        let res = JSON.parse(st);
        //console.log(Object.values(res));
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            let lot: LotExt | null = this.getJLot(JSON.stringify(res[key]));
            if (lot != null)
              lots.push(lot);
          }
        }
        //console.log(this.lots);
        //this.myLots = Array.of(res.json().results);
      },
      (error) => {
        console.log(error);
        this.lots = [];
      });




    return lots;
  }

  filterBuyableLots(filter: Filter) {
    let url = 'http://localhost:8081/api/lots/getLots';
    let token = localStorage.getItem('token');
    if (token == null) token = "";
    //console.log(token);
    const headerDict = {
      'Authorization': token,
      'responseType': 'text'
    };

    let paramDict: HttpParams = new HttpParams()
      .set('sortColumn', filter.sortCol.toUpperCase())
      .set('asc', filter.direct);
    if (filter.maxPrice != -1) {
      paramDict=paramDict.append('maxPrice', filter.maxPrice);
    }
    if (filter.minPrice != -1) {
      paramDict=paramDict.append('minPrice', filter.minPrice);
    }
    if (filter.categories.length>0) {
      paramDict=paramDict.append('categories', filter.categories.toString().toUpperCase().replace(' ','_'));
      console.log(filter.categories.toString().toUpperCase().replace(' ','_'));
    }
    if (filter.search != '') {
      paramDict=paramDict.append('search', filter.search);
      console.log(filter.search);
    }

    console.log(paramDict);

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
      params : paramDict
  };

    return this.http.get(url, requestOptions);
  }

  sortLots(lots: LotExt[], sel: string) {
    let cols = sel.split(' ');
    let col = cols[0];
    let dir = cols[1];
    switch (col) {
      case 'Id':
        lots = lots.sort((n1, n2) => {
          if (n1.id > n2.id) {
            return 1;
          }
          if (n1.id < n2.id) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Name':
        lots = lots.sort((n1, n2) => {
          if (n1.name > n2.name) {
            return 1;
          }
          if (n1.name < n2.name) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Status':
        lots = lots.sort((n1, n2) => {
          if (n1.status > n2.status) {
            return 1;
          }
          if (n1.status < n2.status) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Category':
        lots = lots.sort((n1, n2) => {
          if (n1.category > n2.category) {
            return 1;
          }
          if (n1.category < n2.category) {
            return -1;
          }
          return 0;
        });
        break;
      case 'StartDate':
        lots = lots.sort((n1, n2) => {
          if (n1.startDate > n2.startDate) {
            return 1;
          }
          if (n1.startDate < n2.startDate) {
            return -1;
          }
          return 0;
        });
        break;
      case 'EndDate':
        lots = lots.sort((n1, n2) => {
          if (n1.endDate > n2.endDate) {
            return 1;
          }
          if (n1.endDate < n2.endDate) {
            return -1;
          }
          return 0;
        });
        break;
      case 'StartPrice':
        lots = lots.sort((n1, n2) => {
          if (n1.startPrice > n2.startPrice) {
            return 1;
          }
          if (n1.startPrice < n2.startPrice) {
            return -1;
          }
          return 0;
        });
        break;
      case 'EndPrice':
        lots = lots.sort((n1, n2) => {
          if (n1.minPrice > n2.minPrice) {
            return 1;
          }
          if (n1.minPrice < n2.minPrice) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Rating':
        lots = lots.sort((n1, n2) => {
          if (n1.rating > n2.rating) {
            return 1;
          }
          if (n1.rating < n2.rating) {
            return -1;
          }
          return 0;
        });
        break;
    }
    if (dir == 'D') {
      lots.reverse()
    }
    return lots;
  }

  getUsersLot() {
    let url = 'http://localhost:8081/api/lots/myLots';
    let token = localStorage.getItem('token');
    if (token == null) token = "";
    //console.log(token);
    const headerDict = {
      'Authorization': token,
      'responseType': 'text'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(url, requestOptions);
  }


  loadImg(file: File) {
    let url = 'http://localhost:8081/api/file/uploadFile';
    let token = localStorage.getItem('token');
    if (token == null) token = "";
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', token)
    }
    const fd = new FormData();
    fd.append("file", file, file.name);
    return this.http.post(url, fd, header)
  }

  getBuyableLots() {
    let url = 'http://localhost:8081/api/lots/getLots';
    let token = localStorage.getItem('token');
    if (token == null) token = "";
    //console.log(token);
    const headerDict = {
      'Authorization': token,
      'responseType': 'text'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(url, requestOptions);
  }

  getBuyableLotById(id: number) {
    let url = 'http://localhost:8081/api/lots/buyableLot/' + id;
    let token = localStorage.getItem('token');
    if (token == null) token = "";
    //console.log(token);
    const headerDict = {
      'responseType': 'text'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(url, requestOptions);
  }

  getJLot(js: string) {
    let curLot = JSON.parse(js);
    if (curLot == null) return null;
    let lot: LotExt = {
      id: curLot['id'],
      name: curLot['name'],
      description: curLot['descr'],
      category: curLot['category'],
      imgPath: curLot['imgPath'],
      startPrice: curLot['startPrice'],
      minPrice: curLot['minPrice'],
      curPrice: Math.round(curLot['currentPrice'] * 100) / 100,
      startDate: curLot['startDate'],
      endDate: curLot['endDate'],
      creationDate: curLot['creationDate'],
      salePrice: curLot['salePrice'],
      status: curLot['status'],
      location: curLot['location'],
      rating: 5
    };
    //console.log(lot);
    return lot;
  }

}

export interface Lot {
  id: number,
  name: String,
  description: String,
  category: string,
  photo: string,
  startPrice: Number,
  endPrice: Number,
  startDate: String,
  endDate: String,
  location: String
}

export interface LotExt {
  id: number,
  name: String,
  description: String,
  category: string,
  imgPath: string,
  startPrice: Number,
  minPrice: Number,
  curPrice: Number,
  startDate: Date,
  endDate: Date,
  creationDate: Date,
  salePrice: Number,
  status: String,
  location: String,
  rating: Number
}

export interface Filter {
  sortCol: string,
  direct: boolean,
  categories: string[],
  search: string,
  minPrice: number,
  maxPrice: number
}