import { ThemeProviderContext } from "./contexts/ThemeContext";
import { FormProvider } from "./contexts/FormContext";
import Home from "./pages/home";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <ThemeProviderContext>
        <GlobalStyles />
      <FormProvider>
        <Home />
      </FormProvider>
    </ThemeProviderContext>
  );
}

export default App;
