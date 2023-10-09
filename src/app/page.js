

export default function Home() {
  return (
   <main className="p-4">
    <header className="flex justify-between mb-4">
      <a href= "">EpicCaptions</a>
      <nav className="flex gap-6">
      <a href="">Home</a>
        <a href="">Pricing</a>
        <a href="">Contact</a>
      </nav>
    </header>
    <div>
      <h1>Add epic captions to your videos </h1>
      <h2>Just upload your files and we will do the rest</h2>
    </div>
    <div>
      <button>Choose file </button>
    </div>
   </main>
  )
}
