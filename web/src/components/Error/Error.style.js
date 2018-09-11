import styled from "styled-components";
import { errorRed, white, paddingMedium } from "../../globalVariables";

export default styled.div`
  background-color: ${errorRed};
  border-radius: 3px;
  padding: ${paddingMedium};
  margin-top: ${paddingMedium};
  &:first-child: {
    margin-top: 0;
  }
  span {
    color: ${white};
  }
`;
