import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RoomDto } from '../dto/RoomDto';
import { Observable } from 'rxjs';
import { RoomResponseDto } from '../dto/RoomResponseDto';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private http=inject(HttpClient)
  private apiUrl='https://localhost:7206/api';
  getAvailableRooms(dto:RoomDto):Observable<RoomResponseDto[]>{
    return this.http.post<RoomResponseDto[]>(`${this.apiUrl}/Room/available`,dto);

  }
}
