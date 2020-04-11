import { Action } from 'redux';

export default function counter(state = 0, action: Action<string>) {
  switch (action.type) {
    default:
      return state;
  }
}
