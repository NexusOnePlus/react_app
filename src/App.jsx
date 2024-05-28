import "./App.css";
import Espacios from '../public/components/ui/espacios';
import Menu from '../public/components/ui/header';
import Proceso from '../public/components/ui/proceso';
import { MatrixProvider } from '../public/components/ui/context';
function App() {
  return (
    <MatrixProvider>
    <div>
      <Menu />
    </div>
    </MatrixProvider>
  );
}

export default App;
