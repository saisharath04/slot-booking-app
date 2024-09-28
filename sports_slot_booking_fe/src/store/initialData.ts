import {
  LoginApiResponseType,
  RegisterApiResponseType,
  PostApiResponseType,
  ViewBookingsResponseType,
  SlotAvailabilityResponseType,
  CentersListResponseType,
  FacilitiesListResponseType,
  UserType,
} from "./types";

export const userDetailsInitialValues: UserType = {
  id: 0,
  name: "",
  email: "",
  password: "",
  created_at: "",
};

export const loginInitialResponse: LoginApiResponseType = {
  success: false,
  message: "",
  user_details: userDetailsInitialValues,
  token: "",
};

export const registerInitialResponse: RegisterApiResponseType = {
  success: false,
  message: "",
  status: 0,
  user_details: userDetailsInitialValues,
};

export const postApiInitialResponse: PostApiResponseType = {
  success: false,
  message: "",
};

export const viewBookingsInitialResponse: ViewBookingsResponseType = {
  success: false,
  total_count: 0,
  booking_list: [],
};

export const slotAvailabilityInitialResponse: SlotAvailabilityResponseType = {
  success: false,
  available_slots: [],
};

export const centersListInitialResponse: CentersListResponseType = {
  success: false,
  total_count: 0,
  centers: [],
};

export const facilitiesListInitialResponse: FacilitiesListResponseType = {
  success: false,
  total_count: 0,
  data: [],
};
