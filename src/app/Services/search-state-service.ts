import { Injectable, signal } from '@angular/core';
import { HotelDto } from '../Dtos/HotelSerachDto';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
   searchData = signal<HotelDto>({
    location: '',
    fromDate: '',
    toDate: ''
  });

  setSearch(data: HotelDto) {
    this.searchData.set(data);
  }

  getSearch() {
    return this.searchData();
  }
}
