import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_authenticated/Chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/ws");
    ws.current = websocket;
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      console.log(event);
      // const data = JSON.parse(event.data);
      // queryClient.setQueriesData(data.entity, (oldData: any) => {
      //   const update = (entity: any): any => {
      //     console.log(entity);
      //     entity.id === data.id ? { ...entity, ...data.payload } : entity;
      //     return Array.isArray(oldData) ? oldData.map(update) : update(oldData);
      //   };
      // });
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);

  const onSend = () => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "message",
          conversation_id: 2,
          sender_id: user.id,
          content: message,
        })
      );
    }
  };

  return (
    <div className="h-[calc(100%-1rem)] flex flex-col">
      <div className="flex-1 h-full overflow-auto">messages</div>
      <div className="flex gap-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-8"
          placeholder="Your message"
        />
        <Button type="button" onClick={onSend} className="h-full">
          Send
        </Button>
      </div>
    </div>
  );
}
