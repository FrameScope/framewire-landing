/** Props every proof scene receives from the host stage. */
export interface SceneProps {
  /** Scene time in seconds (settled constant under reduced motion). */
  t: number;
  reduced: boolean;
  /** Narrow viewport — scenes recompose their layout rather than only shrinking. */
  compact: boolean;
}
