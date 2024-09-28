import dayjs, { Dayjs } from "dayjs";
import { USER_DETAILS } from "./constants";
import { userDetailsInitialValues } from "./store/initialData";
import { UserType } from "./store/types";

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const getLoggedUserDetails: () => UserType = () => {
  const userDetails = localStorage.getItem(USER_DETAILS);
  const user = userDetails ? JSON.parse(userDetails) : userDetailsInitialValues;
  return user;
};


const today = dayjs().startOf("day");

const isPastDate = (current: Dayjs | null): boolean => {
  return current ? current.isBefore(today) : false;
};

export const disablePastDates = (current: Dayjs | null): boolean => {
  return isPastDate(current);
};

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const label = i.toString().padStart(2, "0") + ":00";
  const value = (i + 1).toString().padStart(2, "0") + ":00:00";
  return { label, value };
});
