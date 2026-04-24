import { Routes } from '@angular/router';
import { Search } from '../components/search/search';
import { HotelList } from '../components/hotel-list/hotel-list';
import { Booking } from '../components/booking/booking';
import { RoomList } from '../components/room-list/room-list';

export const routes: Routes = [
    {path:'',component:Search},
    {path:'hotels',component:HotelList},
    {path:'rooms',component:RoomList},
    {path:'booking',component:Booking}
];
