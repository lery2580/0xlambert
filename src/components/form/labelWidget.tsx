import React from "react";
import "./labelWidget.less";
interface ILabelWidget {
  label: string;
  children: JSX.Element;
}
function LabelWidget(props: ILabelWidget) {
  const { label, children } = props;
  return (
    <div className="labelWidget">
      <p>{label}</p>
      {children}
    </div>
  );
}
export default LabelWidget;
