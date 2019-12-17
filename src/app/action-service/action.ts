import { ACTIONS } from './actions.enum';

export class Action{
  type: ACTIONS;
  context: string;
  rawEvent: any;
  item: any;
}
