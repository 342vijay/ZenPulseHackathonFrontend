import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookingRequestDto } from '../dto/BookingRequestDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http=inject(HttpClient)
  private apiUrl='https://localhost:7206/api';

bookRoom(dto:BookingRequestDto):Observable<boolean>{
return this.http.post<boolean>(`${this.apiUrl}/Booking/book`,dto);
}

}
