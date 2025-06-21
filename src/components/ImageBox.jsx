
export default function ImageBox({ galery }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300">
      <div className="relative">
        <img
          src={galery.image}
          alt={galery.functionName}
          className="w-full h-60 object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="p-4 text-white">
        <h4 className="text-lg font-bold">{galery.functionName}</h4>
        <p className="text-sm text-gray-300">
          {new Date(galery.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

