import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TimeInputProps {
  seconds?: number;
  onChange?: (seconds: number) => void;
  label?: string;
  className?: string;
}

export function TimeInput({
  seconds = 0,
  onChange,
  label,
  className,
  ...props
}: TimeInputProps) {
  const [h, setH] = useState(Math.floor(seconds / 3600));
  const [m, setM] = useState(Math.floor((seconds % 3600) / 60));
  const [s, setS] = useState(seconds % 60);

  // Update state if seconds prop changes
  useEffect(() => {
    setH(Math.floor(seconds / 3600));
    setM(Math.floor((seconds % 3600) / 60));
    setS(seconds % 60);
  }, [seconds]);

  // Call onChange when any value changes
  useEffect(() => {
    if (onChange) {
      onChange(h * 3600 + m * 60 + s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [h, m, s]);

  console.log(props);

  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      {label && <label className="mr-2 font-medium">{label}</label>}
      <div>
        <Label>HH</Label>
        <Input
          type="number"
          min={0}
          className="w-16 px-2 py-1 border rounded"
          value={h}
          onChange={(e) => setH(Math.max(0, parseInt(e.target.value) || 0))}
          aria-label="Hours"
        />
      </div>
      <span>:</span>
      <div>
        <Label>MM</Label>
        <Input
          type="number"
          min={0}
          max={59}
          className="w-16 px-2 py-1 border rounded"
          value={m}
          onChange={(e) =>
            setM(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
          }
          aria-label="Minutes"
        />
      </div>
      <span>:</span>
      <div>
        <Label>SS</Label>
        <Input
          type="number"
          min={0}
          max={59}
          className="w-16 px-2 py-1 border rounded"
          value={s}
          onChange={(e) =>
            setS(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
          }
          aria-label="Seconds"
        />
      </div>
    </div>
  );
}
