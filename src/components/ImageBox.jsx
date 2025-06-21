export default function ImageBox({ galery }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-300">
      <div className="relative">
        <div className="m-4 rounded-xl overflow-hidden">
          <img
            src={galery.image}
            alt={galery.functionName}
            className="w-full h-60 object-cover brightness-90 "
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="px-6  pb-4 text-white">
        <h4 className="text-lg font-semibold">{galery.functionName}</h4>
        <p className="text-sm text-gray-400">
          {new Date(galery.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
