import { Button, ButtonProps } from "antd";
import "./Button.css";

export function PrimaryButton(props: Omit<ButtonProps, "color" | "size">) {
  return (
    <Button type="default" size="large" className="ant-btn-primary" {...props}>
      {props.children}
    </Button>
  );
}
