import { Pad } from "./pad";

type Pad = {
  id: number;
  color: string;
  sound: string;
};

const pads: Pad[] = [
  { id: 1, color: "bg-red-500", sound: "キック" },
  { id: 2, color: "bg-blue-500", sound: "スネア" },
  { id: 3, color: "bg-green-500", sound: "ハイハット" },
  { id: 4, color: "bg-yellow-500", sound: "クラップ" },
  { id: 5, color: "bg-purple-500", sound: "タム1" },
  { id: 6, color: "bg-pink-500", sound: "タム2" },
  { id: 7, color: "bg-indigo-500", sound: "クラッシュ" },
  { id: 8, color: "bg-orange-500", sound: "ライド" },
];

type PadGridProps = {
  onPadPress: (padId: number) => void;
  activePad: number | null;
};

export function PadGrid({ onPadPress, activePad }: PadGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {pads.map((pad) => (
        <Pad
          key={pad.id}
          {...pad}
          onPress={() => onPadPress(pad.id)}
          isActive={activePad === pad.id}
        />
      ))}
    </div>
  );
}
