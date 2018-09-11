import React from "react";
import Error from "../Error/Error";
import type { FieldProps } from "redux-form";
import FieldWrapper from "./RenderField.style";

export default ({
  input,
  label,
  type,
  meta: { touched, error }
}: FieldProps) => (
  <FieldWrapper>
    <label htmlFor={type}>
      {label}
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-input primary"
        />
        {touched && error && <Error message={error} />}
      </div>
    </label>
  </FieldWrapper>
);
