export const route = "http://localhost:25088/api";

export const loginApiRoute = `${route}/auth/login`;
export const registerApiRoute = `${route}/auth/register`;
export const centersListApiRoute = `${route}/centers`;
export const CreateBookingApiRoute = `${route}/bookings/create`;
export const UpdateBookingApiRoute = `${route}/bookings/update`;
export const ViewBookingsListApiRoute = `${route}/bookings/list`;
export const DeleteBookingApiRoute = `${route}/bookings/delete`;
export const SlotAvailabilityApiRoute = `${route}/bookings/slot_availability`;
export const facilitiesListApiRoute = (id: number) =>
`${route}/centers/${id}/facilities`;
