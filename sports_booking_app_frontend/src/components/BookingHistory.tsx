import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Typography,
  message,
} from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";
import {
  CentersListAsyncThunk,
  DeleteBookingAsyncThunk,
  FacilitiesListAsyncThunk,
  ViewBookingsListAsyncThunk,
} from "../store/thunk";
import {
  BookingEntityType,
  BookingHistoryFiltersType,
  PostApiResponseType,
} from "../store/types";
import TableColumns from "./TableColumns";
import UpdateBooking from "./UpdateBooking";
import dayjs, { Dayjs } from "dayjs";

const BookingHistory = () => {
  const [filters, setFilters] = useState<BookingHistoryFiltersType>({
    booking_date: "",
    page: 1,
  });

  const [selectedBooking, setSelectedBooking] = useState<
    BookingEntityType | undefined
  >();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    isLoadingForLocationList,
    isLoadingForFacilitiesList,
    isLoadingForViewBookings,
    centers,
    facilitiesList,
    booking_list,
    total_count,
    isLoadingForDeleteBooking,
  } = useSelector((state: RootState) => {
    const {
      centersListReducer,
      facilitiesListReducer,
      viewBookingsListReducer,
      deleteBookingReducer,
    } = state;
    return {
      isLoadingForLocationList: centersListReducer?.isLoading,
      isLoadingForFacilitiesList: facilitiesListReducer?.isLoading,
      isLoadingForViewBookings: viewBookingsListReducer?.isLoading,
      centers: centersListReducer?.data?.centers,
      facilitiesList: facilitiesListReducer?.data?.data,
      booking_list: viewBookingsListReducer?.data?.booking_list,
      total_count: viewBookingsListReducer?.data?.total_count,
      isLoadingForDeleteBooking: deleteBookingReducer?.isLoading,
    };
  });

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(CentersListAsyncThunk());
    dispatch(ViewBookingsListAsyncThunk());
  }, []);

  const handleOkForDeleteModal = useCallback(async () => {
    if (selectedBooking?.id) {
      const action = await dispatch(
        DeleteBookingAsyncThunk({ id: selectedBooking?.id })
      );
      const response = action.payload as PostApiResponseType;
      if (response && response.success) {
        setOpenDeleteModal(false);
        setSelectedBooking(undefined);
        dispatch(
          ViewBookingsListAsyncThunk({
            page: 1,
          })
        );
      }
    } else {
      message.error("Booking is not selected");
    }
  }, [selectedBooking]);

  const handleCancelForDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
    setSelectedBooking(undefined);
  }, []);

  const handlePageChange = useCallback(
    async (currPage: number) => {
      await Promise.resolve(setFilters({ ...filters, page: currPage }));
      const { booking_date, facility_id, customer_name, id } = filters;
      dispatch(
        ViewBookingsListAsyncThunk({
          booking_date: booking_date,
          customer_name: customer_name,
          facility_id: facility_id,
          id: id ? Number(id) : undefined,
          page: currPage,
        })
      );
    },
    [dispatch, filters]
  );

  const locationChangeHandler = useCallback(
    async (value?: number) => {
      setFilters({
        ...filters,
        location_id: value,
        facility_id: undefined,
      });
      if (value) {
        dispatch(FacilitiesListAsyncThunk({ id: value }));
      }
    },
    [filters]
  );

  const dateChangeChandler = useCallback(
    (date: Dayjs | null) => {
      setFilters({
        ...filters,
        booking_date: date && date.isValid() ? date.format("YYYY-MM-DD") : "",
      });
    },
    [filters]
  );

  const facilityChangeHandler = useCallback(
    (value?: number) => {
      setFilters({
        ...filters,
        facility_id: value,
      });
    },
    [filters]
  );

  const nameChangeHandler = useCallback(
    (value?: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        customer_name: value?.target?.value,
      });
    },
    [filters]
  );

  const bookingIDChangeHandler = useCallback(
    (value?: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        id: value?.target?.value,
      });
    },
    [filters]
  );

  const applyHandler = useCallback(async () => {
    const { booking_date, facility_id, customer_name, id,location_id } = filters;
    if (location_id && !facility_id){
      message.error("Please select facility as well")
      return
    }
    setFilters({
      ...filters,
      page: 1
    })
      await dispatch(
        ViewBookingsListAsyncThunk({
          booking_date: booking_date,
          customer_name: customer_name,
          facility_id: facility_id,
          id: id ? Number(id) : undefined,
          page: 1,
        })
      );
  }, [dispatch, filters]);

  const isLoading = useMemo(
    () =>
      isLoadingForLocationList ||
      isLoadingForFacilitiesList ||
      isLoadingForViewBookings,
    [
      isLoadingForLocationList,
      isLoadingForFacilitiesList,
      isLoadingForViewBookings,
    ]
  );

  const columns = useMemo(
    () =>
      TableColumns(setSelectedBooking, setOpenDeleteModal, setOpenEditModal),
    []
  );



  return (
    <div style={{ margin: 48 }}>
      <Row gutter={48} align="middle" style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Input
            value={filters.id}
            style={{ width: 180, height: 40 }}
            placeholder="Enter Booking ID"
            allowClear
            onChange={bookingIDChangeHandler}
          />
        </Col>
        <Col span={4}>
          <Input
            value={filters.customer_name}
            style={{ width: 180, height: 40 }}
            placeholder="Enter Name"
            allowClear
            onChange={nameChangeHandler}
          />
        </Col>
        <Col span={4}>
          <Select
            value={filters.location_id}
            style={{ width: 180, height: 40 }}
            placeholder="Select a location"
            allowClear
            onChange={locationChangeHandler}
          >
            {centers?.map((center: any) => (
              <Select.Option key={center.id} value={center.id}>
                {center.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <Select
            placeholder="Select facility"
            allowClear
            value={filters.facility_id}
            style={{ width: 180, height: 40 }}
            onChange={facilityChangeHandler}
            disabled={!filters.location_id}
          >
            {facilitiesList?.map((facility: any) => (
              <Select.Option key={facility.id} value={facility.id}>
                {facility.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <DatePicker
            allowClear
            value={filters.booking_date ? dayjs(filters.booking_date) : null}
            style={{ width: 180, height: 40 }}
            onChange={dateChangeChandler}
          />
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={applyHandler} style={{ height: 40 }}>
            Apply
          </Button>
        </Col>
      </Row>
      <Spin spinning={isLoading}>
        <Table
          bordered
          columns={columns}
          dataSource={booking_list}
          pagination={{
            position: ["bottomRight"],
            pageSize: 10,
            total: total_count,
            current: Number(filters.page),
            hideOnSinglePage: true,
            onChange: handlePageChange,
          }}
          scroll={{ y: 500 }}
        />
      </Spin>
      <Modal
        loading={isLoadingForDeleteBooking}
        title="Are you sure?"
        visible={openDeleteModal}
        onOk={handleOkForDeleteModal}
        onCancel={handleCancelForDeleteModal}
      >
        <Typography.Text>
          "Are you sure you want to delete the booking with ID:{" "}
          {selectedBooking?.id}?"
        </Typography.Text>
      </Modal>
      {selectedBooking && (
        <UpdateBooking
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      )}
    </div>
  );
};

export default BookingHistory;
