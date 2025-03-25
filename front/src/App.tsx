import {BrowserRouter} from "react-router-dom"
import Router from "./router";
import {Navbar} from "./component/navbar";

function App() {

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="container-fluid p-0">
          <Router />
        </section>
      </main>

      <footer>footer</footer>
    </BrowserRouter>
  )
}

export default App
