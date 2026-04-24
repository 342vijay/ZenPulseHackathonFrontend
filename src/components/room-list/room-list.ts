import { Component, inject, signal } from '@angular/core';
import { RoomService } from '../../services/room-service';
import { SharedService } from '../../services/shared-service';
import { RoomResponseDto } from '../../dto/RoomResponseDto';
import { RoomDto } from '../../dto/RoomDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  imports: [],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css',
})
export class RoomList {
//service
    private roomService = inject(RoomService);
  private state = inject(SharedService);
  private router=inject(Router);

  //signal
  rooms = signal<RoomResponseDto[]>([]);
  ngOnInit() {
  console.log(this.state.selectedHotelId());
  console.log(this.state.searchData());
  this.loadRooms();
}
  loadRooms() {
    const search = this.state.searchData();
    const hotelId = this.state.selectedHotelId();

    if (!search || !hotelId) return;

    const dto: RoomDto = {
      hotelId: hotelId,
      fromDate: search.fromDate,
      toDate: search.toDate
    };

    this.roomService.getAvailableRooms(dto)
      .subscribe(res => this.rooms.set(res));
  }

  selectRoom(room: RoomResponseDto) {
    this.state.setRoom(room);

    // navigate to booking page
    this.router.navigate(['/booking']);
  }
  
}
