import { Injectable } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { filter,map ,pluck,distinctUntilChanged} from 'rxjs/operators';
import { Subject, PartialObserver } from 'rxjs';
import { ApiRequest, APiHadithRequest, HadithModel } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  public Url$: Subject<any>=new Subject();
  public Select_source: Subject<any>=new Subject();
  public Loading:Subject<boolean>=new Subject();
  public apiRequest$:Subject<ApiRequest>=new Subject();
  public myAPIRequest$:Subject<APiHadithRequest>=new Subject();
  public inputValidity$:Subject<string>=new Subject();

  constructor(private http:HttpClient) { }

  getHadith(apiURL , Jsonvalue:string){
    console.log("web----");
    console.log(apiURL);
    console.log("----web");
  return this.http.get(apiURL)
  .pipe( pluck(Jsonvalue),distinctUntilChanged() );

  }

  getQuran(apiURL:string){
    return this.http.get(apiURL).pipe(
      pluck('data','text'),distinctUntilChanged()
    )
  }

  getPIHadith(request_obj:APiHadithRequest){
    let sourceBook = 'hadith'
    return this.http.post<HadithModel>('http://localhost:1860/api/hadith/request/'+sourceBook,request_obj);
  }
  
  justget(apiURL){ return this.http.get(apiURL) }

}
