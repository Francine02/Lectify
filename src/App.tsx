import { Footer } from "./components/footer/Footer"
import { Hero } from "./components/hero/Hero"

function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="pt-5 md:pt-7 px-8 sm:px-12 md:px-20 lg:px-24 xl:px-28 2xl:px-36">
        <Hero />
      </div>
      <Footer />
    </div>
  )
}

export default App
