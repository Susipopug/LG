import { MyButton } from "@/components/UI/MyButton";
import { DynamicTabs } from "@/components/UI/Tab/BasicTabs";
import { Input, Modal, Switch, Tabs } from "antd";
import { Controller, useForm } from "react-hook-form";
import styles from "./HeaderModalLarge.module.css";
import { useCalendar } from "@/components/context/CalendarContext";
import type { IUser } from "../interfaces/IUser";
import { USER_INFO_TABS_ITEMS } from "./constants";

interface ModarLargeProps {
  isModalLargeOpen: boolean;
  onModalLargeClose: () => void;
}

export const HeaderModalLarge = ({
  isModalLargeOpen,
  onModalLargeClose,
}: ModarLargeProps) => {
  const { handleSubmit, control, reset } = useForm<IUser>({
    mode: "onSubmit",
  });

  const onSubmit = (data: IUser) => {
    console.log(data);
    onModalLargeClose();
    reset();
  };

  return (
    <>
      {/* {isModalLargeOpen && ( */}
      <div className={styles.dialog}>
        <Modal
          open={isModalLargeOpen}
          onOk={onModalLargeClose}
          onCancel={onModalLargeClose}
          footer={null}
        >
          <div className={styles.modalHeader}></div>

          <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.tabs}>
              <Tabs items={USER_INFO_TABS_ITEMS} />
            </div>
            <Controller
              name="name"
              rules={{ required: "Имя обязательно" }}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <label className={styles.formLabel}>
                    Имя
                    <Input {...field} />
                  </label>
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <Controller
              name="deviceTime"
              control={control}
              render={({ field: { value, onChange } }) => (
                <label className={styles.switchLabel} htmlFor="switch">
                  <Switch size="small" value={value} onChange={onChange} />
                  Время устройства
                </label>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  Номер телефона
                  <Input {...field} />
                </label>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  Адрес электронной почты
                  <Input {...field} />
                </label>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  Пароль
                  <Input.Password {...field} />
                </label>
              )}
            />

            <MyButton buttonType="primary" htmlType="submit">
              Сохранить изменения
            </MyButton>
            <MyButton
              buttonType="default"
              htmlType="button"
              onClick={onModalLargeClose}
            >
              Удалить аккаунт
            </MyButton>
          </form>
        </Modal>
      </div>
      {/* )} */}
    </>
  );
};
