"use client";

import { useState, useEffect } from "react";
import { PadGrid } from "./pad-grid";
import { useWebSocket } from "@/hooks/use-web-socket";

export default function MPCPad() {
  const socket = useWebSocket(
    process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8081"
  );
  const [activePad, setActivePad] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("接続中...");

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket接続が確立されました");
        setConnectionStatus("接続済み");
      };
      socket.onclose = () => {
        console.log("WebSocket接続が閉じられました");
        setConnectionStatus("切断");
      };
      socket.onerror = (error) => {
        console.error("WebSocket接続エラー:", error);
        setConnectionStatus("エラー");
      };
    }
  }, [socket]);

  const handlePadPress = (padId: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "padPress", padId }));
      setActivePad(padId);
      setTimeout(() => setActivePad(null), 100);
    } else {
      console.warn("WebSocket接続が確立されていません");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">MPC パッドコントローラー</h1>
      <div
        className={`mb-4 px-4 py-2 rounded ${
          connectionStatus === "接続済み"
            ? "bg-green-500"
            : connectionStatus === "切断"
            ? "bg-red-500"
            : connectionStatus === "エラー"
            ? "bg-yellow-500"
            : "bg-blue-500"
        } text-white`}
      >
        WebSocket状態: {connectionStatus}
      </div>
      <PadGrid onPadPress={handlePadPress} activePad={activePad} />
    </div>
  );
}
