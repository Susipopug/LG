import styles from "./StudentModal.module.css";
import { MyButton } from "@/components/UI/MyButton";
import { useCalendar } from "@/components/context/CalendarContext";
import {
  Input,
  InputNumber,
  message,
  Modal,
  Tabs,
  Upload,
  type GetProp,
  type UploadProps,
} from "antd";
import type { IStudent } from "../interfaces/StudentInterface";
import { Controller, useForm } from "react-hook-form";
import { STUDENTS_INFO } from "./constants";
import { memo, useCallback, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

interface studentModalProps {
  onAddNewStudent: (student: IStudent) => void;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const StudentModal = memo(({ onAddNewStudent }: studentModalProps)=>{
  const { onCloseStudentModal, addStudent } = useCalendar();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const { handleSubmit, control, reset } = useForm<IStudent>({
    mode: "onSubmit",
  });

  const onSubmit = (data: IStudent) => {
    onAddNewStudent(data);
    onCloseStudentModal();
    reset();
    console.log(data);
  };

  const [tab, setTab] = useState("1");

  console.log(tab);

  console.log("StudentModal");

  //doesn't re-render the component Student on the tab change
  const onChangeTab = useCallback(
    (value: string) => {
      setTab(value);
    },
    [tab]
  );

  // const onChangeTab = (value: string) => {
  //   setTab(value);
  // };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className={styles.dialog}>
      <Modal
        width={440}
        open={addStudent}
        onOk={onCloseStudentModal}
        onCancel={onCloseStudentModal}
        footer={null}
      >
        <div className={styles.modalHeader}></div>
        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.tabs}>
            <Tabs
              onChange={onChangeTab}
              activeKey={tab}
              items={STUDENTS_INFO}
            />
          </div>
          {tab == "1" ? (
            <>
              <div>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      draggable={false}
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
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
                name="comment"
                control={control}
                render={({ field }) => (
                  <label className={styles.formLabel}>
                    Комментарий
                    <Input.TextArea
                      rows={4}
                      placeholder="Текст комментария"
                      maxLength={256}
                      {...field}
                    />
                  </label>
                )}
              />

              <Controller
                name="telegram"
                control={control}
                render={({ field }) => (
                  <label className={styles.formLabel}>
                    Telegram
                    <Input {...field} />
                  </label>
                )}
              />

              <Controller
                name="whatsapp"
                control={control}
                render={({ field }) => (
                  <label className={styles.formLabel}>
                    Whatsapp
                    <Input {...field} />
                  </label>
                )}
              />

              <Controller
                name="phoneNumber"
                rules={{ required: "Номер телефона обязателен" }}
                control={control}
                render={({ field }) => (
                  <label className={styles.formLabel}>
                    Номер телефона
                    <Input {...field} />
                  </label>
                )}
              />
            </>
          ) : (
            <Controller
              name="lessonsBalance"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  Баланс уроков
                  <InputNumber min={1} defaultValue={1} max={52} {...field} />
                </label>
              )}
            />
          )}

          <MyButton buttonType="primary" htmlType="submit">
            Сохранить изменения
          </MyButton>
          <MyButton
            buttonType="default"
            htmlType="button"
            onClick={onCloseStudentModal}
          >
            Удалить ученика
          </MyButton>
        </form>
      </Modal>
    </div>
  );
});