import { Button } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Welcome.module.css';

const cx = classNames.bind(styles);

const Welcome = () => {
  const navigation = useNavigate();
  const buttonHandler = () => {
      navigation("/login");
  };

  return (
    <div className={cx("background_container")}>
      <div className={cx("content")}>
        <h1>Welcome to Ahalya Sports Arena</h1>
        <Button type="primary" onClick={buttonHandler} className={cx("button")}>
          BOOK NOW !!!
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
