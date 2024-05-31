import "./App.css";
import Menu from '../public/components/ui/header';
import { MatrixProvider } from '../public/components/ui/context';
import Titulo from "../public/components/ui/titulo"
function App() {
  return (
    <MatrixProvider>
    <div>
      <Titulo/>
      <Menu />
    </div>
    </MatrixProvider>
  );
}

export default App;
