import React from "react";
import LinkWrapper from "./Link.style";
import { Link as RouterLink } from "react-router-dom";
import { type Props } from "./types";

const Link = (props: Props) => (
  <LinkWrapper className={props.isInlineLink ? "inline-link" : ""}>
    <RouterLink to={props.path}>{props.children}</RouterLink>
  </LinkWrapper>
);

export default Link;
