import "./App.css";
import Selector from '../public/components/ui/selector';
import { MatrixProvider } from '../public/components/context/context';
import Titulo from "../public/components/ui/titulo"
function App() {
  return (
    <MatrixProvider>
    <div>
      <Titulo/>
      <Selector/>
    </div>
    </MatrixProvider>
  );
}

export default App;
