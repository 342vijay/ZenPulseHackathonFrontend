import { Component, inject } from '@angular/core';
import { SearchStateService } from '../../Services/search-state-service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash-board-component',
  imports: [ReactiveFormsModule],
  templateUrl: './dash-board-component.html',
  styleUrl: './dash-board-component.css',
})
export class DashBoardComponent {


   private searchService = inject(SearchStateService);
  private router = inject(Router);
  location = new FormControl('', Validators.required);
  fromDate = new FormControl('', Validators.required);
  toDate = new FormControl('', Validators.required);

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
  }

}
