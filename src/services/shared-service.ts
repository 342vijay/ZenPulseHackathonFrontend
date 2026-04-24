import { Injectable, signal } from '@angular/core';
import { HotelDto } from '../dto/HotelDto';
import { RoomResponseDto } from '../dto/RoomResponseDto';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

   // Search data
  searchData = signal<HotelDto | null>(null);

  // Selected hotel
  selectedHotelId = signal<number | null>(null);

  //  Selected room
  selectedRoom = signal<RoomResponseDto | null>(null);

  setSearch(data: HotelDto) {
    this.searchData.set(data);
  }

  setHotelId(id: number) {
    this.selectedHotelId.set(id);
  }

  setRoom(room: RoomResponseDto) {
    this.selectedRoom.set(room);
  }
}
