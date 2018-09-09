import React from "react";
import ErrorWrapper from "./Error.style";
import Span from "../Span/Span";
import { type Props } from "./types";

const Error = (props: Props) => (
  <ErrorWrapper>
    <Span>{props.message}</Span>
  </ErrorWrapper>
);

export default Error;
