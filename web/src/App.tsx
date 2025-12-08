import { PageContainer } from "./components/layout/PageContainer";
import { CreateCarouselPage } from "./pages/CreateCarouselPage";

function App() {
  return (
    <PageContainer>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Criador de Carrosséis · IA Amarela
          </h1>
          <p className="text-sm text-neutral-400">
            Defina nicho, tom, visual e deixe a IA gerar a narrativa completa.
          </p>
        </div>
      </header>

      <CreateCarouselPage />
    </PageContainer>
  );
}

export default App;
