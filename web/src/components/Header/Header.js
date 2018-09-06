import React from "react";
import HeaderWrapper from "./Header.style";
import { type Props } from "./types.js";

const Header = (props: Props) => (
  <HeaderWrapper>
    <p>{props.title}</p>
  </HeaderWrapper>
);

export default Header;
