import "./App.css";
import Selector from '../public/components/ui/selector';
import { MatrixProvider } from '../public/components/context/context';
import Titulo from "../public/components/ui/titulo"
import Info from "../public/components/ui/info"
function App() {
  return (
    <MatrixProvider>
    <div>
      <Titulo/>
      <Selector/>
      <Info />
    </div>
    </MatrixProvider>
  );
}

export default App;
