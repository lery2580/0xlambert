import React from "react";
import "./titleWidget.less";
interface ITitleWidgetProps {
  label: string;
  subLable?: string;
}
function TitleWidget(props: ITitleWidgetProps) {
  const { label, subLable } = props;
  return (
    <div className="titleWidget">
      <h3>
        {label} {subLable ? <i>{subLable}</i> : null}
      </h3>
    </div>
  );
}
export default TitleWidget;
