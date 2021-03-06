import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ImgNasa } from "./img-nasa";

@Injectable({
  providedIn: 'root'
})
export class NasaImageService {

  private service: Http;

  constructor(p_service: Http) { 
    this.service = p_service;
  }

  public getPlanetImage(param_search: string) : Observable<Array<string>>{

    let url: string = "https://images-api.nasa.gov/search";
    url += "?q=" + param_search + "";
    // url += "&keywords=[]";

    const obs1: Observable<Response> = this.service.get(url);
    return obs1.pipe(
      map(
        (data: Response): string[] => {

          let raw: any = data.json();
          let items: Array<any> = raw.collection.items;
          let i: number = items.length;
          let images: Array<string> = new Array<string>();

          
          debugger;

          while (--i > -1){
            images.push(items[i].links[0].href);            
          }
          return images;
          
        }
      )
    );
  }

  public getPlanetImageInfo(param_search: string) : Observable<Array<any>>{

    let url: string = "https://images-api.nasa.gov/search";
    url += "?q=" + param_search + "";
    // url += "&keywords=[]";

    const obs1: Observable<Response> = this.service.get(url);
    return obs1.pipe(
      map(
        (data: Response): any[] => {

          let raw: any = data.json();
          let items: Array<any> = raw.collection.items;
          let i: number = items.length;
          let images: Array<any> = new Array<any>();

          
          

          while (--i > -1){
            images.push(
              {
              "url": items[i].links[0].href, 
              "title": items[i].data[0].title  
              }   
            );      
          }

          return images;
          
        }
      )
    );
  }
}
