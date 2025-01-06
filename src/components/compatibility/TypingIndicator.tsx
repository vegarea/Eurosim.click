export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-[80%]">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      </div>
      <span className="text-sm text-gray-500">El asistente está escribiendo...</span>
    </div>
  );
}