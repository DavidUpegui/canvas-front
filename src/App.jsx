import Canva from "./components/Canva"
import CanvaTools from "./components/CanvaTools"
import Header from "./components/Header"
import './styles/index.css'


function App() {

  return (
    <div className="container">
      <Header>

      </Header>
      <main className="main_container">
        <Canva></Canva>
        <CanvaTools></CanvaTools>
      </main>

    </div>
  )
}

export default App
