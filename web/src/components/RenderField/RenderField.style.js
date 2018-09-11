import styled from "styled-components";
import { paddingMedium } from "../../globalVariables";

export default styled.div`
  margin-bottom: ${paddingMedium};
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    padding: ${paddingMedium};
  }
`;
