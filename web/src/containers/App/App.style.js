import styled from "styled-components";

export default styled.div`
  text-align: center;
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
  }

  .App-title {
    font-size: 1.5em;
  }

  .App-intro {
    font-size: large;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
