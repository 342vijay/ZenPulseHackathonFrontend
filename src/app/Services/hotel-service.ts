import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HotelDto } from '../Dtos/HotelSerachDto';
import { Observable } from 'rxjs';
import { HotelResponseDto } from '../Dtos/HotelResponseDto';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
private http=inject(HttpClient)

private apiUrl='';
getHotels(dto:HotelDto):Observable<HotelResponseDto[]>{
  return this.http.post<HotelResponseDto[]>(`${this.apiUrl}/hotels`,dto);
}

}
