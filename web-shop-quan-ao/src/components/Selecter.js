import React from "react";

const Selecter = (props) => {
  const {
    inputRef,
    id,
    label,
    labelSize,
    frmField,
    errMessage,
    data,
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
          <select className={inputClass} {...others} {...frmField}>
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
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

export default Selecter;
