import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HotelResponseDto } from '../dto/HotelResponseDto';
import { HotelDto } from '../dto/HotelDto';

@Injectable({
  providedIn: 'root',
})
export class Searchservice {
  private http=inject(HttpClient)
  private apiUrl='https://localhost:7206/api';
  getLocations():Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/Hotel/locations`);
  }
  getHotelByLocationdate(dto:HotelDto):Observable<HotelResponseDto[]>{
return this.http.post<HotelResponseDto[]>(`${this.apiUrl}/Hotel/search`,dto);

  }

  
}
