import { useEffect, useRef } from "react";

const useWebsocket = ({
  onEvent,
  dependencies = [],
}: {
  onEvent: ((this: WebSocket, ev: MessageEvent<any>) => any) | null;
  dependencies?: any[];
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
  }, dependencies);

  return websocketRef.current;
};

export default useWebsocket;
