import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {AutoParts, CarBrand, UserRegistrationData} from "./models";

@Injectable({
  providedIn: 'root'
})
export class CarDataService {

  CAR_MODEL_DATA_API = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Cars9096be5.json";
  AUTO_PARTS_DATA_API = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/ListOfAutoParts1aaa4e5.json";
  REGISTRATION_DUMMY_DATA_API = "https://abc.xyz";

  constructor(private httpClient: HttpClient) {}

  getCarModels(): Observable<CarBrand[]> {
    return this.httpClient.get<CarBrand[]>(this.CAR_MODEL_DATA_API).pipe(
      shareReplay()
    );
  }

  getAutoParts(): Observable<AutoParts[]> {
    return this.httpClient.get<AutoParts[]>(this.AUTO_PARTS_DATA_API).pipe(
      shareReplay()
    );
  }

  submitCarRegistrationForm(data: UserRegistrationData | undefined): Observable<any> {
    return this.httpClient.post(this.REGISTRATION_DUMMY_DATA_API, data);
  }
}
