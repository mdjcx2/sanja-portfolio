// Icon names usable in case study data (cards, process steps, chips).
// The ssr entry renders without React context, so it works in server and
// client components alike.
import {
  CheckCircle,
  Circle,
  CornersOut,
  FastForward,
  FlagCheckered,
  Keyboard,
  ListBullets,
  ListDashes,
  Palette,
  Play,
  Rows,
  Ruler,
  SpeakerHigh,
  SpeakerSlash,
  Stack,
} from "@phosphor-icons/react/ssr";

export const ICONS = {
  check: CheckCircle,
  circle: Circle,
  corners: CornersOut,
  skip: FastForward,
  flag: FlagCheckered,
  keyboard: Keyboard,
  list: ListBullets,
  listExpanded: ListDashes,
  palette: Palette,
  play: Play,
  rows: Rows,
  ruler: Ruler,
  speaker: SpeakerHigh,
  speakerOff: SpeakerSlash,
  stack: Stack,
};

export function Icon({ name, ...props }) {
  const Component = ICONS[name];
  return Component ? <Component aria-hidden="true" {...props} /> : null;
}
