import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../Services/hotel-service';
import { SearchStateService } from '../../Services/search-state-service';
import { HotelResponseDto } from '../../Dtos/HotelResponseDto';

@Component({
  selector: 'app-hotel-component',
  imports: [],
  templateUrl: './hotel-component.html',
  styleUrl: './hotel-component.css',
})
export class HotelComponent {
private hotelService = inject(HotelService);
  private searchService = inject(SearchStateService);

  hotels = signal<HotelResponseDto[]>([]);

  ngOnInit() {

    const dto = this.searchService.getSearch();

    //  auto call API when page loads
    this.hotelService.getHotels(dto).subscribe(res => {
      this.hotels.set(res);
    });
  }



}
