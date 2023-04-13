import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(160, 160, 160, 0.25);
  transition: height 0.3s;
  padding-top: 20px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 16px;
  padding-bottom: 15px;
  padding-left: 15px;

  &.expanded {
    height: 200px;
  }
`;

export const DocInformation = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  padding-top: 20px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 16px;
  float: right;
`;

export const SubjectContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  padding-top: 2px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 16px;
`;

export const Intro = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  padding-top: 20px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 15px;
`;

export const InstructionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  padding-top: 20px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 14px;
  box-shadow: 0px 4px 6px rgba(160, 160, 160, 0.25);
  padding-bottom: 25px;
`;

export const TextBlue = styled.text`
  font-size: 29px;
  height: auto;
  color: #71b0eb;
  font-family: Helvetica, Arial, sans-serif;
`;

export const TextStrongBlue = styled.div`
  font-size: 14px;
  height: auto;
  color: #3c3cea;
  flex-direction: row;
  font-family:  Helvetica, Arial, sans-serif;
  justify-content: center;
  cursor: pointer,
  letter-spacing: 10px;
  padding-right: 10px;
`;

export const TextDocContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  padding-top: 20px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 16px;
  justify-content: flex-start;
`;

export const TextContainer = styled.text`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  background: #ffffff;
  padding-top: 20px;
  font-family: Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 16px;
`;

export const DropdownContainer = styled.div`
  width: 27%;
  position: relative;
`;

export const DropdownButton = styled.button`
  width: 350px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  height: 45px;
  left: 25px;
  top: 60px;
  background: #f1f1f1;
  border-color: #f1f1f1;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  padding: 10px;
  margin-top: 20px;

  &:active,
  &:focus {
    box-shadow: 0 0 0 1px;
  }
`;

export const DropdownList = styled.ul`
  background-color: #fff;
  color: #666666;
  font-size: 16px;
  font-family: Helvetica, Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const DropdownListItem = styled.li`
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const ValInput = styled.input`
  width: 396px;
  height: 47px;
  font-family: Helvetica, Arial, sans-serif;
  background: #f1f1f1;
  border-color: #f1f1f1;
  width: 100%;
  height: 80px;
`;

export const SubmitButton = styled.button`
  width: 129px;
  height: 55px;
  color: #ffffff;
  font-size: 1em;
  background-color: #008080;
  border: #cc5741;
  border-radius: 14px;
  transition: width 2s, height 2s, transform 2s;
  margin-right: auto;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
`;
