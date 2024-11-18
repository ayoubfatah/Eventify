export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen p-5 bg-black min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
