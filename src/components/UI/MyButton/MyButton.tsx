import { Button } from "antd";

interface MyButtonProps {
  children: React.ReactNode;
  // color: string;
  // backgroundColor: string;
  // border: string;
  onClick?: () => void;
  buttonType?: "link" | "text" | "default" | "primary" | "dashed";
  htmlType?: "submit" | "button" | "reset";
  size?: "small" | "large";
}

export const MyButton = ({
  onClick,
  children,
  buttonType = "primary",
  htmlType = "button",
  size = "large",
}: MyButtonProps) => {
  return (
    <Button
    // переопределить стили в самомо компоненте
      size={size}
      type={buttonType}
      htmlType={htmlType}
      onClick={onClick}
      block
    >
      {children}
    </Button>
  );
};
