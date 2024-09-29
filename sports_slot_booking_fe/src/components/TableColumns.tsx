import { Button, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { BookingEntityType } from "../store/types";

const { Text } = Typography;

type TableColumnsType = (
  setSelectedBooking: (val: BookingEntityType) => void,
  setOpenDeleteModal: (val: boolean) => void,
  setOpenEditModal: (val: boolean) => void
) => ColumnsType<BookingEntityType>;

const TableColumns: TableColumnsType = (
  setSelectedBooking,
  setOpenDeleteModal,
  setOpenEditModal
) => {
  const updateHandler = (rowData: BookingEntityType) => {
    setSelectedBooking(rowData);
    setOpenEditModal(true);
  };

  const deleteHandler = (rowData: BookingEntityType) => {
    setSelectedBooking(rowData);
    setOpenDeleteModal(true);
  };

  return [
    {
      title: "Booking ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "customer_name",
    },
    {
      title: "Phone number",
      dataIndex: "customer_phone_number",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (created_at: string) => (
        <Text>{moment(created_at).format("Do MMM YYYY")}</Text>
      ),
    },
    {
      title: "Center",
      dataIndex: "center_name",
    },
    {
      title: "Facility",
      dataIndex: "facility_name",
    },
    {
      title: "Booking date",
      dataIndex: "booking_date",
      render: (booking_date: string) => (
        <Text>{moment(booking_date).format("Do MMM YYYY")}</Text>
      ),
    },
    {
      title: "Start",
      dataIndex: "start_time",
    },
    {
      title: "End",
      dataIndex: "end_time",
    },
    {
      title: "Created by",
      dataIndex: "user_name",
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (_: number, rowData: BookingEntityType) => {
        const isPast = moment(`${rowData.booking_date}`).isBefore(moment());
        return (
          <>
            <Button
              disabled={isPast}
              type="link"
              onClick={() => updateHandler(rowData)}
            >
              Update
            </Button>
            <Button
              disabled={isPast}
              type="link"
              onClick={() => deleteHandler(rowData)}
            >
              Delete
            </Button>
          </>
        );
      },
      fixed: "right",
    },
  ];
};

export default TableColumns;
