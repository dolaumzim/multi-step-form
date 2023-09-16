import * as Styled from "./styles";

interface StepFormProps {
  title: string;
  nextStep?: () => void;
  prevStep?: () => void;
  children: React.ReactNode;
}

export const StepForm = ({
  title,
  nextStep,
  prevStep,
  children,
}: StepFormProps) => {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      {children}
      <Styled.Actions>
        {prevStep ? <button onClick={prevStep}>Anterior</button> : null}
        {nextStep ? <button onClick={nextStep}>Próximo</button> : null}
      </Styled.Actions>
    </Styled.Container>
  );
};
