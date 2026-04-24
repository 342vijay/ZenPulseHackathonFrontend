import { Component, inject, OnInit, signal } from '@angular/core';
import { Searchservice } from '../../services/searchservice';
import { SharedService } from '../../services/shared-service';
import { HotelResponseDto } from '../../dto/HotelResponseDto';
import { HotelDto } from '../../dto/HotelDto';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css',
})
export class HotelList implements OnInit{
  //di of services
   private searchService = inject(Searchservice);
   private state = inject(SharedService);
   private router=inject(Router)
   //signal
   hotels = signal<HotelResponseDto[]>([]);
ngOnInit(): void {
    this.loadHotels();
}

    //   load hotels
  loadHotels() {
    const search = this.state.searchData();

    if (!search) return;

    const dto: HotelDto = search;

    this.searchService.getHotelByLocationdate(dto)
      .subscribe(res => this.hotels.set(res));
  }

  selectHotel(id: number) {
    this.state.setHotelId(id);
    this.router.navigate(['/rooms']);
  }
}
