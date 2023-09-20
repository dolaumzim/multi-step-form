import { createContext, useContext, useState } from "react";
import { FormData, initialValues } from "../types/structure";


interface FormContextType {
  allData : FormData
  setAllData : React.Dispatch<React.SetStateAction<FormData>>
  step : number
  setStep : React.Dispatch<React.SetStateAction<number>>
}

const FormContext = createContext<FormContextType>({
    allData : {} as FormData,
    setAllData : () => {},
    step : 1,
    setStep : () => {},
});

export const FormProvider = ({ children }: React.PropsWithChildren) => {

    const [allData, setAllData] = useState<FormData>(
      initialValues
    )
    const [step, setStep] = useState<number>(1)

  return (
    <FormContext.Provider
      value={{
        allData,
        setAllData,
        step,
        setStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const ctx = useContext(FormContext);
  if (ctx === undefined) {
    throw new Error("Tem que ser usado dentro de um Provider");
  }
  return ctx;
};
