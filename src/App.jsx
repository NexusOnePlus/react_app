import "./App.css";
import Espacios from '../public/components/ui/espacios';
import Menu from '../public/components/ui/header';
import Proceso from '../public/components/ui/proceso';
function App() {
  return (

    <div>
      <Menu />
      <div className="App">
        <Espacios />
      </div>
        < Proceso />
    </div>
  );
}

export default App;
