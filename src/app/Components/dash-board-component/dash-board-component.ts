import { DashBoardService } from './../../Services/dash-board-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchStateService } from '../../Services/search-state-service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash-board-component',
  imports: [ReactiveFormsModule],
  templateUrl: './dash-board-component.html',
  styleUrl: './dash-board-component.css',
})
export class DashBoardComponent implements OnInit {

  private searchService = inject(SearchStateService);
  private router = inject(Router);
  private DashBoardService = inject(DashBoardService);
 

  location = new FormControl('', Validators.required);
  fromDate = new FormControl('', Validators.required);
  toDate = new FormControl('', Validators.required);

  //  store locations
  locations = signal<string[]>([]);

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.DashBoardService.getLocations()
      .subscribe(data => {
        this.locations.set(data);
      });
  }

  search() {
    if (this.location.invalid || this.fromDate.invalid || this.toDate.invalid) {
      alert('Please fill all fields');
      return;
    }

    this.searchService.setSearch({
      location: this.location.value!,
      fromDate: this.fromDate.value!,
      toDate: this.toDate.value!
    });

    this.router.navigate(['/hotels']);
  }}