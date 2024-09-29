export type ErrorMessageType = {
  response: {
    data: {
      message: string;
    };
  };
};

export type LoginApiPayloadType = {
  email: string;
  password: string;
};

export type LoginApiResponseType = {
  success: boolean;
  message: string;
  user_details: UserType;
  token: string;
};

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export type RegisterApiPayloadType = {
  email: string;
  password: string;
  name: string;
};

export type RegisterApiResponseType = {
  success: boolean;
  message: string;
  status: number;
  user_details: UserType;
};

export type CentersListPayloadType = {
  id?: number;
};

export type CentersListResponseType = {
  success: boolean;
  total_count: number;
  centers: CenterEntityType[];
};

export interface CenterEntityType {
  id: number;
  name: string;
  address: string;
}

export type FacilitiesListPayloadType = {
  id: number;
};

export type FacilitiesListResponseType = {
  success: boolean;
  total_count: number;
  data: FacilityEntityType[];
};

export type FacilityEntityType = {
  id: number;
  center_id: number;
  name: string;
  available_slots: SlotEntityType[];
  created_at: string;
};

export type SlotEntityType = {
  end_time: string;
  start_time: string;
};

export type CreateBookingPayloadType = {
  user_id: number;
  facility_id: number;
  booking_date: string;
  slots: SlotEntityType[];
  customer_name: string;
  customer_phone_number: string;
};

export type PostApiResponseType = {
  success: boolean;
  message: string;
};

export type ViewBookingsListPayloadType = {
  id?: number;
  facility_id?: number;
  booking_date?: string;
  customer_name?: string;
  page: number
};

export type ViewBookingsResponseType = {
  success: boolean;
  total_count: number;
  booking_list: BookingEntityType[];
};

export type BookingEntityType = {
  id: number;
  user_id: number;
  facility_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  customer_name: string;
  customer_phone_number: string;
  user_name: string;
  facility_name: string;
  center_name: string;
};

export type UpdateBookingPayloadType = {
  id: number;
  user_id: number;
  facility_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  customer_phone_number: string;
};

export type DeleteBookingPayloadType = {
  id: number;
};

export type SlotAvailabilityPayloadType = {
  booking_date: string;
  facility_id: number;
};

export type SlotAvailabilityResponseType = {
  success: boolean;
  available_slots: AvailableSlot[];
};

export type AvailableSlot = {
  start_time: string;
  end_time: string;
  is_booked: boolean;
};

export type BookingSlotFiltersType = {
  booking_date: string;
  location_id?: number;
  facility_id?: number;
};

export type BookingHistoryFiltersType = {
  id?: string;
  customer_name?: string;
  booking_date: string;
  location_id?: number;
  facility_id?: number;
  page: number
};

export type SelectedSlotsTypes = {
  start_time?: string;
  end_time?: string;
  is_booked: boolean;
};
