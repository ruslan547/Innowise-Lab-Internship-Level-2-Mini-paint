import { ShowAction } from '../actions/show.actions';
import { showConstants } from '../constants/show.constants';
import { Image } from '../services/firebase.db.service';

const initState = {
  images: {},
};

export interface ShowState {
  images: Record<string, Image>;
}

export function showReducer(state = initState, action: ShowAction): ShowState {
  switch (action.type) {
    case showConstants.SUCCESS_DOWNLOAD:
      return { ...state, images: action.payload };
    default:
      return state;
  }
}
