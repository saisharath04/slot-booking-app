import React, { useEffect, useState, useCallback, useMemo } from "react";
import { BookingSlotFiltersType, SelectedSlotsTypes } from "../store/types";
import {
  Button,
  Modal,
  Input,
  message,
  Typography,
  Select,
  DatePicker,
  Row,
  Col,
  Spin,
} from "antd";
import ViewSlot from "./ViewSlot";
import styles from "../styles/SlotBooking.module.css";
import {
  disablePastDates,
  getLoggedUserDetails,
  validatePhoneNumber,
} from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";
import {
  FacilitiesListAsyncThunk,
  CentersListAsyncThunk,
  slotAvailabilityAsyncThunk,
  CreateBookingAsyncThunk,
} from "../store/thunk";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";

const SlotBooking: React.FC = () => {
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlotsTypes[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filters, setFilters] = useState<BookingSlotFiltersType>({
    booking_date: "",
    facility_id: undefined,
    location_id: undefined,
  });

  const dispatch = useDispatch<DispatchType>();

  const applyHandler = useCallback(async () => {
    const { booking_date, facility_id, location_id } = filters;
    if (
      !booking_date ||
      facility_id === undefined ||
      location_id === undefined
    ) {
      message.error("Please select all filters to get data");
      return;
    }
    await dispatch(slotAvailabilityAsyncThunk({ facility_id, booking_date }));
  }, [filters, dispatch]);

  const handleBookClick = useCallback(() => {
    if (selectedSlots.length === 0) {
      message.error("Please select at least one slot.");
      return;
    }
    setIsModalVisible(true);
  }, [selectedSlots]);

  const handleModalOk = useCallback(async () => {
    if (!name || !phone) {
      message.error("Please fill in your name and phone number.");
      return;
    }
    if (!validatePhoneNumber(phone)) {
      message.error("Please enter a valid 10-digit phone number.");
      return;
    }
    const user = getLoggedUserDetails();
    await dispatch(
      CreateBookingAsyncThunk({
        booking_date: filters.booking_date,
        customer_name: name,
        customer_phone_number: phone,
        facility_id: filters.facility_id ?? 0,
        slots: selectedSlots.map((slot) => ({
          end_time: slot.end_time ?? "",
          start_time: slot.start_time ?? "",
        })),
        user_id: user?.id,
      })
    ).then(() => {
      dispatch(
        slotAvailabilityAsyncThunk({
          booking_date: filters.booking_date,
          facility_id: filters.facility_id ?? 0,
        })
      );
    });

    setSelectedSlots([]);
    setName("");
    setPhone("");
    setIsModalVisible(false);
  }, [name, phone, filters, selectedSlots, dispatch]);

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const locationChangeHandler = useCallback(
    async (value?: number) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location_id: value,
        facility_id: undefined,
      }));
      if (value) {
        await dispatch(FacilitiesListAsyncThunk({ id: value }));
      }
    },
    [dispatch]
  );

  const dateChangeHandler = useCallback((date: Dayjs | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      booking_date: date && date.isValid() ? date.format("YYYY-MM-DD") : "",
    }));
  }, []);

  const facilityChangeHandler = useCallback((value?: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      facility_id: value,
    }));
  }, []);

  const {
    isLoadingForLocationList,
    isLoadingForFacilitiesList,
    isLoadingForSlotAvailability,
    centers,
    facilitiesList,
    available_slots,
  } = useSelector((state: RootState) => ({
    isLoadingForLocationList: state.centersListReducer?.isLoading,
    isLoadingForFacilitiesList: state.facilitiesListReducer?.isLoading,
    isLoadingForSlotAvailability: state.slotAvailabilityReducer?.isLoading,
    centers: state.centersListReducer?.data?.centers,
    facilitiesList: state.facilitiesListReducer?.data?.data,
    available_slots: state.slotAvailabilityReducer?.data.available_slots,
  }));

  useEffect(() => {
    dispatch(CentersListAsyncThunk());
  }, [dispatch]);

  const isLoading = useMemo(
    () =>
      isLoadingForLocationList ||
      isLoadingForFacilitiesList ||
      isLoadingForSlotAvailability,
    [
      isLoadingForLocationList,
      isLoadingForFacilitiesList,
      isLoadingForSlotAvailability,
    ]
  );

  const showSlots = useMemo(
    () => available_slots.length !== 0,
    [available_slots]
  );

  return (
    <div className={styles.container}>
      <Row gutter={48} align="middle" style={{ marginBottom: "24px" }}>
        <Col span={6}>
          <Select
            value={filters.location_id}
            style={{ width: 180, height: 40 }}
            placeholder="Select a location"
            allowClear
            onChange={locationChangeHandler}
          >
            {centers?.map((center) => (
              <Select.Option key={center.id} value={center.id}>
                {center.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <DatePicker
            allowClear
            value={
              Boolean(filters.booking_date) ? dayjs(filters.booking_date) : null
            }
            className={styles.filter}
            style={{ width: 180, height: 40 }}
            onChange={dateChangeHandler}
            disabledDate={disablePastDates}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Select facility"
            allowClear
            value={filters.facility_id}
            style={{ width: 180, height: 40 }}
            onChange={facilityChangeHandler}
          >
            {facilitiesList?.map((facility) => (
              <Select.Option key={facility.id} value={facility.id}>
                {facility.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={applyHandler} style={{ height: 40 }}>
            Apply
          </Button>
        </Col>
      </Row>

      <Spin spinning={isLoading}>
        {showSlots ? (
          <>
            <ViewSlot
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
            />
            <Button
              type="primary"
              onClick={handleBookClick}
              style={{ marginTop: "20px" }}
            >
              Book Slot
            </Button>
          </>
        ) : (
          <Typography.Title>Select all filters to get data</Typography.Title>
        )}
      </Spin>

      <Modal
        title="Confirm Booking"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div style={{ marginBottom: "10px" }}>
          <strong>Selected Date:</strong>{" "}
          {filters.booking_date || "Not selected"} <br />
          <strong>Selected Slots:</strong>
          {selectedSlots.length > 0
            ? selectedSlots.map((slot, index) => (
                <span key={index}>
                  {slot.start_time}-{slot.end_time}
                  {index < selectedSlots.length - 1 ? ", " : ""}
                </span>
              ))
            : "None"}
        </div>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />
      </Modal>
    </div>
  );
};

export default SlotBooking;
