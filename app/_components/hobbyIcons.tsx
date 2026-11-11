import type { IconType } from "react-icons";
import { FaPersonRunning } from "react-icons/fa6";
import { GiFrisbee, GiBowlingStrike } from "react-icons/gi";
import { BsStarFill } from "react-icons/bs";

const icons: Record<string, IconType> = {
  running: FaPersonRunning,
  discgolf: GiFrisbee,
  bowling: GiBowlingStrike,
};

export function hobbyIcon(id: string): IconType {
  return icons[id] ?? BsStarFill;
}
