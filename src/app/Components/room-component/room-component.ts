import { SearchStateService } from './../../Services/search-state-service';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RoomResponseDto } from '../../Dtos/RoomResponseDto';
import { Observable } from 'rxjs';
import { RoomService } from '../../Services/room-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RoomRequestDto } from '../../Dtos/RoomRequestDto';

@Component({
  selector: 'app-room-component',
  imports: [ReactiveFormsModule],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css',
})
export class RoomComponent implements OnInit {
//  slider
  priceRange = new FormControl(5000);

  // backend data
  rooms = signal<RoomResponseDto[]>([]);

  constructor(
    private roomService: RoomService,
    private searchState: SearchStateService
  ) {}

  ngOnInit() {

    const hotelId = this.searchState.selectedHotelId();
    const search = this.searchState.getSearch();

    if (!hotelId || !search.fromDate || !search.toDate) {
      console.error('Missing search data');
      return;
    }

    // create DTO
    const request: RoomRequestDto = {
      hotelId: hotelId,
      fromDate: search.fromDate,
      toDate: search.toDate
    };

    this.loadRooms(request);
  }

  //  DTO-based API call
  loadRooms(dto: RoomRequestDto) {
    this.roomService.getRoomsBySearch(dto)
      .subscribe(data => {
        this.rooms.set(data);
      });
  }

  //  price filter
  filteredRooms = computed(() => {
    const maxPrice = this.priceRange.value || 0;

    return this.rooms().filter(room =>
      room.price <= maxPrice
    );
  });

}
