import React from "react";

const Input = (props) => {
  const {
    type,
    inputRef,
    id,
    label,
    labelSize,
    errMessage,
    frmField,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-from-label`;
  const inputClass = `form-control ${errMessage ? "is-invalid" : ""}`;
  return (
    <>
      <div className="row mb-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <div className="col-sm">
          {others["row"] > 1 ? (
            <textarea
              ref={inputRef}
              className={inputClass}
              id={id}
              {...others}
              {...frmField}
            ></textarea>
          ) : (
            <input
              type={type}
              ref={inputRef}
              id={id}
              {...others}
              {...frmField}
              className={inputClass}
            />
          )}
          {errMessage ? (
            <div className="invalid-feedback">{errMessage}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
