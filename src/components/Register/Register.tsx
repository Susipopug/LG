import {
  Controller,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import styles from "./Register.module.css";
import hands from "@assets/images/hands.svg";
import google from "@assets/images/google.svg";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { inherits } from "node:util";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { GoogleButton } from "../UI/GoogleButton/GoogleButton";

// Inside your component...

type IRegister = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClear = () => {
    setValue("");
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IRegister>({
    // defaultValues: {
    //   // Add default values
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IRegister> = (data) =>
    console.log("submited data", data);

  const onError = (errors: FieldErrors<IRegister>) => {
    console.log("Form errors:", errors);
  };

  console.log("errors:", errors);
  console.log("getValues:", getValues());

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // const allValues = watch();
  // const { email, password, confirmPassword } = allValues;

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log("Form values changed:", value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={hands} alt="hands" />

        <h1 className={styles.title}>Создать аккаунт</h1>

        {/* <Form onFinish={handleSubmit(onSubmit, onError)}>
          <Controller
            render={({ field }) => (
              <Form.Item<IRegister>
                label="Адрес электронной почты"
                validateStatus={errors.email ? "error" : "validating"}
                help={errors.email?.message}
              >
                
                <Input
                  {...register("email", {
                    required: "Поле необходимо заполнить",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Неверный адрес электронной почты",
                    },
                  })}
                  type="email"
                  placeholder="Адрес электронной почты"
                />
              </Form.Item>
            )}
          /> */}

        {/* <Form.Item<IRegister>
            label="Пароль"
            validateStatus={errors.password ? "error" : "validating"}
            help={errors.password?.message}
          >
            <Input.Password
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 ",
                },
              })}
              type="password"
              placeholder="Пароль"
              name="password"
              allowClear
              // minLength={8}
            />
          </Form.Item>

          <Form.Item<IRegister>
            label="Повтор паролья"
            validateStatus={errors.confirmPassword ? "error" : "validating"}
            help={errors.confirmPassword?.message}
          >
            <Input.Password
              {...register("confirmPassword", {
                required: "Поле необходимо заполнить",
                // validate: (value) =>
                //   value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Повтор пароля"
              name="confirmPassword"
              allowClear
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles.form}
        >
          <div className="inputWrapper">
            {/* {email && (
              <div className={styles.labelAbove}>Адрес электронной почты</div>
            )} */}
            <TextField
              {...register("email", {
                required: "Поле необходимо заполнить",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Неверный адрес электронной почты",
                },
              })}
              type="email"
              // placeholder="Адрес электронной почты"
              fullWidth
              size="small"
              label="Адрес электронной почты"
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "grey.400", // Light grey color
                  },
                },
              }}
            />
            {errors.email && (
              <p role="alert" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* <div className="inputWrapper">
            {password && <div className={styles.labelAbove}>Пароль</div>}
            <Input.Password
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 ",
                },
              })}
              type="password"
              placeholder="Пароль"
              allowClear
              // minLength={8}
            />
            {errors.password && (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}
          </div> */}

          {/* Material UI */}
          <div className="inputWrapper">
            <TextField
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type={showPassword ? "text" : "password"}
              label="Пароль"
              name="password"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "grey.500" }}
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>

                      {value && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            aria-label="clear input"
                            onClick={() => setValue("")}
                            edge="end"
                            sx={{ color: "grey.500" }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )}
                    </>
                  ),
                },
                inputLabel: {
                  sx: {
                    color: "grey.400", // Light grey color
                  },
                },
              }}
            />
            {errors.password && (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="inputWrapper">
            <TextField
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type={showPassword ? "text" : "password"}
              label="Повтор пароля"
              name="password"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "grey.500" }}
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>

                      {value && (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="clear input"
                            onClick={() => setValue("")}
                            edge="end"
                            sx={{ color: "grey.500" }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )}
                    </>
                  ),
                },
                inputLabel: {
                  sx: {
                    color: "grey.400", // Light grey color
                  },
                },
              }}
            />
            {errors.password && (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button> */}

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1677FF",
                fontStyle: "normal",
                fontSize: "inherit",
                textTransform: "none",
              }}
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </form>
        <GoogleButton />
        <Link to={"/login"} className={styles.link}>
          Уже есть аккаунт
        </Link>
      </div>
    </div>
  );
};
