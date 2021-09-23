import React from "react";
import "./formWrapWidget.less";
interface IFormWrapWidgetProps {
  children: JSX.Element[];
}
function FormWrapWidget(props: IFormWrapWidgetProps) {
  const { children } = props;
  return <div className="labelWidget">{children}</div>;
}
export default FormWrapWidget;
