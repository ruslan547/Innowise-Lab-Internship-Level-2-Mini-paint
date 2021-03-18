import { ShowAction } from '../actions/show.actions';
import { showConstants } from '../constants/show.constants';
import { Image } from '../services/firebase.db.service';

const initState = {
  images: {},
  sortedImages: {},
  sortKey: 'all',
};

export interface ShowState {
  images: Record<string, Image>;
  sortedImages: Record<string, Image>;
  sortKey: string;
}

export function showReducer(state = initState, action: ShowAction): ShowState {
  switch (action.type) {
    case showConstants.SUCCESS_DOWNLOAD:
      return { ...state, images: { ...action.payload } };
    case showConstants.SORT:
      return { ...state, sortKey: action.payload };
    default:
      return state;
  }
}
