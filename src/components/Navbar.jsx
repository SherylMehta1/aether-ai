export default function Navbar() {
  return (
    <div className="w-full px-4 pt-4">
      <nav
        className="bg-gray-800 text-gray-100
                   rounded-2xl
                   px-6 py-4
                   shadow-md
                   border border-white/50
                   flex justify-center items-center
                   transition-transform duration-300
                   hover:scale-[1.01]"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🜁</span>
          <h1 className="text-2xl font-bold tracking-wide heading-font">
            AetherAI
          </h1>
        </div>
      </nav>
    </div>
  );
}
