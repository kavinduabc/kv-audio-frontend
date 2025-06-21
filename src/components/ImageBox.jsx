export default function ImageBox({ galery }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-300">
      <div className="relative">
        <div className="m-4 rounded-xl overflow-hidden">
          <img
            src={galery.image || "c:/Users/USER/Pictures/Screenshots/Screenshot 2025-06-21 083235.png"}
            alt={galery.functionName}
            className="w-full h-60 object-cover brightness-90 border-4 border-gray-500 rounded-lg"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="px-6 pb-4 text-white flex justify-between">
        <h4 className="text-lg font-semibold">{galery.functionName}</h4>
        <p className="text-sm text-gray-400">
          {galery.date ? new Date(galery.date).toLocaleDateString() : ""}
        </p>
      </div>
    </div>
  );
}