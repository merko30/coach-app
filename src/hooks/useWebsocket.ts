import { useEffect, useRef } from "react";

const useWebsocket = ({
  onEvent,
}: {
  onEvent: ((this: WebSocket, ev: MessageEvent<any>) => any) | null;
}): WebSocket | null => {
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(import.meta.env.VITE_WS_URL);
    websocketRef.current = websocket;
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = onEvent;

    return () => {
      websocket.close();
    };
  }, []);

  return websocketRef.current;
};

export default useWebsocket;
