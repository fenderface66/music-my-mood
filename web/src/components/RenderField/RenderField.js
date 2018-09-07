import React from "react";

export default ({ input, label, type, meta: { touched, error } }) => (
  <div className="care-recipient-info__field">
    <label htmlFor={type} className="form-label primary">
      {label}
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-input primary"
        />
        {touched &&
          error && <p className="care-recipient-info__field__error">{error}</p>}
      </div>
    </label>
  </div>
);
