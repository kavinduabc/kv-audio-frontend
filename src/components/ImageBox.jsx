export default function ImageBox({ galery }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="rounded-xl overflow-hidden">
          <img
            src={galery.image }
            alt={galery.functionName}
            className="w-full h-56 object-cover"
          />
        </div>
        {/* Overlay for text at the bottom */}
        <div className="absolute bottom-0 w-full  px-4 py-2 flex justify-between items-center text-gray-200">
          <span className="text-sm font-medium truncate">{galery.functionName || "Event Name"}</span>
          <span className="text-sm text-[13px]">{galery.date ? new Date(galery.date).toLocaleDateString() : "No Date"}</span>
        </div>
      </div>
    </div>
  );
}
