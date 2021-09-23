import React, { AllHTMLAttributes, ChangeEventHandler } from "react";
import "./inputWidget.less";
interface IInputWidgetProps extends AllHTMLAttributes<HTMLElement> {
  value: string | ReadonlyArray<string> | number | undefined;
  placeholder: string;
  type: string;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  onChange?: ChangeEventHandler<any> | undefined;
}
function InputWidget(props: IInputWidgetProps) {
  const {
    value,
    disabled,
    readOnly,
    placeholder,
    type,
    alt,
    onChange: _onChange,
  } = props;
  return (
    <div className="inputWidget">
      <input
        alt={alt}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        onChange={(e) => {
          e.persist();
          if (_onChange) {
            _onChange(e);
          }
        }}
      />
    </div>
  );
}
export default InputWidget;
