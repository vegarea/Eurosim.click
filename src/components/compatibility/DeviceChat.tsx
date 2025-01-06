import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DeviceChatProps {
  deviceModel: string;
  onReset: () => void;
}

export function DeviceChat({ deviceModel, onReset }: DeviceChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const checkCompatibility = async () => {
      try {
        setIsTyping(true);
        const { data, error } = await supabase.functions.invoke("ai-assistant", {
          body: {
            role: "compatibility_checker",
            message: deviceModel,
          },
        });

        if (error) throw error;

        const initialMessages: Message[] = [
          { role: "user", content: `¿Es compatible ${deviceModel} con eSIM?` },
          { role: "assistant", content: data.response },
        ];
        setMessages(initialMessages);
      } catch (error) {
        console.error("Error checking compatibility:", error);
      } finally {
        setIsTyping(false);
      }
    };

    checkCompatibility();
  }, [deviceModel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: {
          role: "compatibility_checker",
          message: input,
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onReset}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-medium">Chat de Compatibilidad</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Escribe tu pregunta aquí..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}