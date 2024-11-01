import { useCallback } from "react";
import { Button } from "@/components/ui/button";

type PadProps = {
  id: number;
  color: string;
  sound: string;
  onPress: () => void;
  isActive: boolean;
};

export function Pad({ id, color, sound, onPress, isActive }: PadProps) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        onPress();
      }
    },
    [onPress]
  );

  return (
    <Button
      className={`w-32 h-32 ${color} ${
        isActive ? "opacity-75" : ""
      } transition-opacity duration-100`}
      onTouchStart={(e) => {
        e.preventDefault();
        onPress();
      }}
      onClick={onPress}
      onKeyDown={handleKeyDown}
      aria-label={`${sound}を再生`}
    >
      <span className="sr-only">{sound}</span>
    </Button>
  );
}
