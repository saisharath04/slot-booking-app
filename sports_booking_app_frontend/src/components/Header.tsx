import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Typography } from "antd";
import classNames from "classnames/bind";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JWT_TOKEN, USER_DETAILS } from "../constants";
import { getLoggedUserDetails } from "../helpers";
import styles from "../styles/Header.module.css";

const { Text } = Typography;
const cx = classNames.bind(styles);

const RenderMenu = ({
  handleMenuClick,
}: {
  handleMenuClick: (e: { key: string }) => void;
}) => (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="home">Home</Menu.Item>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="booking_history">Booking history</Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useMemo(() => localStorage.getItem(JWT_TOKEN), []);
  const user = useMemo(() => getLoggedUserDetails(), []);

  const isLogin = useMemo(() => token !== null, [token]);
  const getButtonText = useMemo(
    () => (isLogin ? user?.name : "Sign in / Sign up"),
    [token, user]
  );

  const handleMenuClick = useCallback(
    (e: { key: string }) => {
      if (e.key === "profile") {
        navigate("/profile");
      } else if (e.key === "logout") {
        localStorage.removeItem(JWT_TOKEN);
        localStorage.removeItem(USER_DETAILS);
        navigate("/login");
      } else if (e.key === "booking_history") {
        navigate("/booking_history");
      } else if (e.key === "home") {
        navigate("/home");
      }
    },
    [navigate]
  );

  const handleButtonClick = useCallback(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const shouldShowProfile = useMemo(
    () => location.pathname !== "/login" && location.pathname !== "/",
    [location.pathname]
  );

  return (
    <header className={cx("container")}>
      <div className={cx("header_container")}>
        <h1 className={cx("title")}>Ahalya Sports</h1>
      </div>
      {shouldShowProfile && (
        <div className={cx("profile")}>
          {isLogin ? (
            <Dropdown
            placement="bottomRight"
              overlay={<RenderMenu handleMenuClick={handleMenuClick} />}
              // trigger={["hover"]}
            >
              <Button type="text" style={{ padding: 0 }}>
                <Avatar icon={<UserOutlined />} />
                <>
                  <Text className={cx("user_name")}>{getButtonText}</Text>
                  <DownOutlined />
                </>
              </Button>
            </Dropdown>
          ) : (
            <Button
              type="text"
              style={{ padding: 0 }}
              onClick={handleButtonClick}
            >
              <Avatar icon={<UserOutlined />} />
              <Text className={cx("user_name")}>{getButtonText}</Text>
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
