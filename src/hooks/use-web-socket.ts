import { useState, useEffect } from "react";

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket接続が確立されました");
    };

    ws.onerror = (error) => {
      console.error("WebSocket接続エラー:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket接続が閉じられました");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
}
