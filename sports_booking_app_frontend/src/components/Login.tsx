import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import classNames from "classnames/bind";
import styles from "../styles/Login.module.css";
import { Button, Input, Typography, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterApiResponseType } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { LoginAsyncThunk, RegisterAsyncThunk } from "../store/thunk";
import { DispatchType, RootState } from "../store/store";

type LoginFormType = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const { Text } = Typography;
const cx = classNames.bind(styles);

const Login = () => {
  const [registerType, setRegisterType] = useState<"login" | "signup">("login");
  const [registerForm] = useForm<LoginFormType>();
  const dispatch = useDispatch<DispatchType>();
  const navigation = useNavigate();

  const { title, footerText, footerBtnText } = useMemo(() => {
    return registerType === "login"
      ? {
          title: "Login",
          footerText: "Not a member?",
          footerBtnText: "SignUp now",
        }
      : {
          title: "Sign Up",
          footerText: "Already a member?",
          footerBtnText: "Login now",
        };
  }, [registerType]);

  const footerBtnHandler = useCallback(() => {
    setRegisterType((prev) => (prev === "login" ? "signup" : "login"));
    registerForm.resetFields();
  }, [registerForm]);

  const handleSubmit = useCallback(
    async (values: LoginFormType) => {
      if (registerType === "login") {
        const action = await dispatch(
          LoginAsyncThunk({
            email: values.email,
            password: values.password,
          })
        );
        const response = action.payload as RegisterApiResponseType;
        if (response && response.success) {
          navigation("/home");
        }
      } else {
        await dispatch(
          RegisterAsyncThunk({
            email: values.email,
            name: values.name,
            password: values.password,
          })
        ).then((action) => {
          const response = action.payload as RegisterApiResponseType;
          if (response && response.success) {
            setRegisterType("login");
          }
        });
      }
    },
    [dispatch, registerType, navigation]
  );

  const isLoading = useSelector(
    (state: RootState) =>
      state.loginReducer.isLoading || state.registerReducer.isLoading
  );

  return (
    <div className={cx("container")}>
      <div className={cx("register_content")}>
        <div className={cx("title_container")}>
          <Text className={cx("title")}>{title}</Text>
        </div>
        <Form
          layout="vertical"
          name="registerForm"
          form={registerForm}
          preserve={false}
          onFinish={handleSubmit}
          validateTrigger="onChange"
        >
          <div>
            <Form.Item
              label={
                <span style={{ color: "#5607bd", fontSize: 16 }}>Email</span>
              }
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid E-mail!",
                },
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
            >
              <Input className={cx("input_field")} placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: "#5607bd", fontSize: 16 }}>Password</span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
              ]}
            >
              <Input.Password
                className={cx("input_field")}
                placeholder="Enter password"
              />
            </Form.Item>

            {registerType === "signup" && (
              <>
                <Form.Item
                  label={
                    <span style={{ color: "#5607bd", fontSize: 16 }}>Name</span>
                  }
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <Input
                    className={cx("input_field")}
                    placeholder="Enter name"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ color: "#5607bd", fontSize: 16 }}>
                      Confirm password
                    </span>
                  }
                  name="confirm_password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className={cx("input_field")}
                    placeholder="Confirm password"
                  />
                </Form.Item>
              </>
            )}
          </div>
          <div>
            <Button
              className={cx("confirm_button")}
              onClick={registerForm.submit}
              loading={isLoading}
            >
              {title}
            </Button>
          </div>
        </Form>
        <div className={cx("footer")}>
          <Text className={cx("footer_text")}>{footerText}</Text>
          <Button
            style={{ background: "none" }}
            className={cx("footer_button")}
            onClick={footerBtnHandler}
          >
            {footerBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
