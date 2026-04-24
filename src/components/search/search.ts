import { Component, inject, OnInit, signal } from '@angular/core';
import { Searchservice } from '../../services/searchservice';
import { SharedService } from '../../services/shared-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HotelDto } from '../../dto/HotelDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  //injecting services
  private searchService = inject(Searchservice);
  private state = inject(SharedService);
  //injecting router
  private router = inject(Router);

    // simple FormControls (string because input[type=date] returns string)
  city = new FormControl<string>('', { nonNullable: true });
  fromDate = new FormControl<string>('', { nonNullable: true });
  toDate = new FormControl<string>('', { nonNullable: true });
  cities = signal<string[]>([]);
  //loading locations using ngOnInit life cycle hook
  ngOnInit(): void {
    this.loadLocations();
  }
 loadLocations() {
  this.searchService.getLocations().subscribe({
    next: res => this.cities.set(res),
    error: err => console.error('Failed to load locations', err)
  });
}
 search(): void {
    // simple manual validation
    if (!this.city.value || !this.fromDate.value || !this.toDate.value) {
      alert('Please fill all fields');
      return;
    }

    const dto: HotelDto = {
      location: this.city.value,
      fromDate: this.fromDate.value,
      toDate: this.toDate.value
    };

    //  store in shared signal
    this.state.setSearch(dto);
    //navigation to hotel
    this.router.navigate(['/hotels']);
  }


}
