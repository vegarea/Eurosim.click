interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%] rounded-lg px-4 py-2 
          ${isUser 
            ? "bg-primary text-white" 
            : "bg-white border border-gray-200"
          }
        `}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}