import {BrowserRouter} from "react-router-dom"
import Router from "./router"
import {Navbar} from "./component/navbar"
import Footer from "./component/footer"

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

        <footer className="footer">
            <Footer />
        </footer>
    </BrowserRouter>
  )
}

export default App
