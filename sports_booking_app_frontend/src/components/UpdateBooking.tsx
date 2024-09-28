import {
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { useState, useCallback, useMemo } from "react";
import {
  BookingEntityType,
  PostApiResponseType,
  UpdateBookingPayloadType,
} from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";
import moment from "moment";
import { timeSlots } from "../helpers";
import { disablePastDates, getLoggedUserDetails, validatePhoneNumber } from "../helpers";
import {
  UpdateBookingAsyncThunk,
  ViewBookingsListAsyncThunk,
} from "../store/thunk";
import dayjs, { Dayjs } from "dayjs";

const UpdateBooking = ({
  openEditModal,
  setOpenEditModal,
  selectedBooking,
  setSelectedBooking,
}: {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  selectedBooking: BookingEntityType;
  setSelectedBooking: (value?: BookingEntityType) => void;
}) => {
  const dateTime = selectedBooking?.booking_date;
  const formattedDate = dayjs(dateTime).format("YYYY-MM-DD");

  const [form, setForm] = useState<BookingEntityType>({
    ...selectedBooking,
    booking_date: formattedDate,
  });
  const dispatch = useDispatch<DispatchType>();

  const handleOkForEditModal = useCallback(async () => {
    if (!validatePhoneNumber(form.customer_phone_number)) {
      message.error("Please enter a valid 10-digit phone number.");
      return;
    }
    const payload: UpdateBookingPayloadType = {
      ...form,
      user_id: getLoggedUserDetails()?.id,
    };

    await dispatch(UpdateBookingAsyncThunk(payload)).then(async (action) => {
      const response = action.payload as PostApiResponseType;
      if (response && response.success) {
        setOpenEditModal(false);
        setSelectedBooking(undefined);
        await dispatch(
          ViewBookingsListAsyncThunk({
            page: 1,
          })
        );
      }
    });
    setSelectedBooking(undefined);
  }, [form, dispatch, setOpenEditModal, setSelectedBooking]);

  const handleCancelForEditModal = useCallback(() => {
    setOpenEditModal(false);
    setSelectedBooking(undefined);
  }, [setOpenEditModal, setSelectedBooking]);

  const startTimeChangeHandler = useCallback((value?: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      start_time: value ?? "",
    }));
  }, []);

  const endTimeChangeHandler = useCallback((value?: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      end_time: value ?? "",
    }));
  }, []);

  const isLoadingForUpdateBooking = useSelector(
    (state: RootState) => state?.updateBookingReducer?.isLoading
  );

  const timeSlotOptions = useMemo(
    () =>
      timeSlots.map((timeSlot) => (
        <Select.Option key={timeSlot.value} value={timeSlot.value}>
          {timeSlot.label}
        </Select.Option>
      )),
    []
  );


  return (
    <Modal
      open={openEditModal}
      confirmLoading={isLoadingForUpdateBooking}
      title="Edit Booking"
      onOk={handleOkForEditModal}
      onCancel={handleCancelForEditModal}
    >
      <div style={{ margin: 36 }}>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Booking ID:</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{form?.id}</Typography.Text>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Name</Typography.Text>
          </Col>
          <Col span={12}>
            <Input
              allowClear
              placeholder="Enter your name"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
              style={{ marginBottom: "10px" }}
            />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Phone Number</Typography.Text>
          </Col>
          <Col span={12}>
            <Input
              allowClear
              placeholder="Enter your phone number"
              value={form.customer_phone_number}
              onChange={(e) =>
                setForm({ ...form, customer_phone_number: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Booking Date</Typography.Text>
          </Col>
          <Col span={12}>
            <DatePicker
              disabledDate={disablePastDates}
              value={form.booking_date ? dayjs(form.booking_date) : null}
              format="YYYY-MM-DD"
              onChange={(date) => {
                if (date && date.isValid()) {
                  setForm({
                    ...form,
                    booking_date: date.format("YYYY-MM-DD"),
                  });
                } else {
                  setForm({
                    ...form,
                    booking_date: "",
                  });
                }
              }}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Start time</Typography.Text>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select start time"
              allowClear
              value={form.start_time}
              style={{ width: 190 }}
              onChange={startTimeChangeHandler}
            >
              {timeSlotOptions}
            </Select>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>End time</Typography.Text>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select end time"
              allowClear
              value={form.end_time}
              style={{ width: 190 }}
              onChange={endTimeChangeHandler}
            >
              {timeSlotOptions}
            </Select>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default UpdateBooking;
