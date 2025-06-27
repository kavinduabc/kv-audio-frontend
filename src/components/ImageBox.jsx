export default function ImageBox({ galery }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white">
      <div className="relative">
        <img
          src={galery.image}
          alt={galery.functionName}
          className="w-full h-48 object-cover"
        />

        {/* Bottom overlay */}
        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 px-3 py-2 text-white text-sm flex justify-between items-center">
          <span className="truncate">{galery.functionName || "Event Name"}</span>
          <span className="text-xs">
            {galery.date ? new Date(galery.date).toLocaleDateString() : "No Date"}
          </span>
        </div>
      </div>
    </div>
  );
}

