import "./App.css";
import Espacios from '../public/components/ui/espacios';
import Menu from '../public/components/ui/header';
function App() {
  return (

    <div>
      <Menu />
      <div className="App">
        <Espacios />
      </div>
    </div>
  );
}

export default App;
