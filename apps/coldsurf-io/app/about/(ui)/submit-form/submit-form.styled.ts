import { Button, TextArea, TextInput, media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledFormOuterContainer = styled.div`
  margin-top: 8rem;
  ${media.large(css`
    margin-left: 1rem;
    margin-right: 1rem;
  `)}
`;

export const StyledSubmitFormContainer = styled.div`
  display: flex;

  ${media.medium(css`
    flex-direction: column;
  `)}
`;

export const StyledFormLeft = styled.div`
  flex: 0.4;

  ${media.medium(css`
    flex: unset;
  `)}
`;

export const StyledFormRight = styled.form`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  margin-left: 2.5rem;

  ${media.medium(css`
    margin-left: unset;
  `)}
`;

export const StyledTextInput = styled(TextInput)`
  width: 100%;
`;
export const StyledTextArea = styled(TextArea)`
  height: 15rem;
`;
export const StyledSubmitButton = styled(Button)`
  margin-top: 2rem;
`;
