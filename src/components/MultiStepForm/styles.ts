import styled from "styled-components";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  input {
    border-radius: 15px;
    padding: 5px 10px;
    border: none;
  }

  input:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondary.light};
  }

  select {
    border-radius: 15px;
    padding: 5px 10px;
    margin: 5px;
  }

  select:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondary.light};
  }

  textarea {
    border-radius: 15px;
    padding: 5px 10px;
    border: none;
  }

  textarea:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondary.light};
  }

  label {
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  color: ${({ theme }) => theme.colors.buttontext.main};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.buttontext.main};
  border-radius: 15px;
  width: 8vw;
  margin: 5px;
  cursor: pointer;

  &:disabled {
    background: gray;
    color: #cfcfc6;
    cursor: default;
  }

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.buttonbg.main};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const Submit = styled.button`
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.buttonbg.dark};
  border: 1px solid ${({ theme }) => theme.colors.buttontext.main};
  border-radius: 15px;
  width: 8vw;
  margin: 5px;
  cursor: pointer;

  &:disabled {
    background: gray;
    color: #cfcfc6;
    cursor: default;
  }

  &:hover:enabled {
    background-color: #003063;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const Remove = styled.button`
  color: ${({ theme }) => theme.colors.buttontext.main};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.buttontext.main};
  border-radius: 10px;
  width: 20px;
  margin: 5px;
  cursor: pointer;

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const Add = styled.button`
  color: ${({ theme }) => theme.colors.buttontext.main};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.buttontext.main};
  border-radius: 10px;
  width: 30px;
  margin: 5px;
  cursor: pointer;

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.success?.main};
    color: ${({ theme }) => theme.colors.black};
  }
`;
export const AddField = styled.button`
  color: ${({ theme }) => theme.colors.buttontext.main};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.buttontext.main};
  border-radius: 10px;
  width: 80%;
  margin: 5px;
  cursor: pointer;

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.success?.main};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const PDF = styled.button`
  width: 500px;
  height: 200px;
  border-radius: 40px;
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  margin: 20px;
  font-size: 80px;
  color: #020202;

  &:disabled {
    width: 50%;
    height: auto;
    background-image: none;
    background: gray;
    color: #cfcfc6;
    font-size: 20px;
    cursor: default;
  }
`;

export const StateCity = styled.div`
  display: flex;
  gap: 5px;
`;

export const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 200px;
`;

export const Pokeball = styled.img`
  width: 50px;
  height: 50px;
`;
export const Charmander = styled.img`
  height: 30%;
`;
export const Charmeleon = styled.img`
  height: 50%;
`;
export const Charizard = styled.img``;
