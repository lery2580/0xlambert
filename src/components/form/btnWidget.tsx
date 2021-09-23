import React, { MouseEventHandler } from "react";
import "./btnWidget.less";
interface IBtnWidgetProps {
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}
function BtnWidget(props: IBtnWidgetProps) {
  const { label, onClick } = props;
  return (
    <div className="btnWidget" onClick={onClick}>
      {label}
    </div>
  );
}
export default BtnWidget;
