import { Component, inject } from '@angular/core';
import { BookingRequestDto } from '../../dto/BookingRequestDto';
import { BookingService } from '../../services/booking-service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
   private bookingService = inject(BookingService);
  state = inject(SharedService);
  private router = inject(Router);

  name: string = '';

  book() {
    const room = this.state.selectedRoom();
    const search = this.state.searchData();

    if (!room || !search || !this.name) {
      alert("Please fill all details");
      return;
    }

    const dto: BookingRequestDto = {
      roomId: room.roomId,
      fromDate: search.fromDate,
      toDate: search.toDate,
      customerName: this.name
    };

    this.bookingService.bookRoom(dto).subscribe({
      next: () => {
        alert("Booking Confirmed");

        // optional: go back to home
       // this.router.navigate(['/']);
      },
      error: () => {
        alert("Booking Failed");
      }
    });
  }
  getTotalPrice(): number {
  const room = this.state.selectedRoom();
  const search = this.state.searchData();

  if (!room || !search) return 0;

  const days =
    (new Date(search.toDate).getTime() -
     new Date(search.fromDate).getTime()) / (1000 * 60 * 60 * 24);

  return room.price * days;
}
}
