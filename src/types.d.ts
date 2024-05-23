export type Mode = 'play' | 'move' | 'delete' | 'add';
export type ActionType = 'number' |' slider' | 'array';
export type SetMode = (newMode : Mode) => void;
export type Action = {
  type : ActionType;
  title: string;
  actionName: string;
  step: number;
  range?: [number, number];
};
