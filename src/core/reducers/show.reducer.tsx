import { User } from '../actions/auth.actions';
import { ShowAction } from '../actions/show.actions';
import { showConstants } from '../constants/show.constants';
import { Image } from '../services/firebase.db.service';

const initState = {
  images: {},
  users: {},
  filtredImages: {},
  filtredKey: 'all',
};

export interface ShowState {
  images: Record<string, Image>;
  users: Record<string, User>;
  filtredImages: Record<string, Image>;
  filtredKey: string;
}

export function showReducer(state = initState, action: ShowAction): ShowState {
  switch (action.type) {
    case showConstants.SUCCESS_DOWNLOAD:
      return { ...state, images: { ...action.payload } };
    case showConstants.FILTER_IMAGES:
      return { ...state, filtredKey: action.payload };
    case showConstants.SET_IMAGES:
      return { ...state, filtredImages: { ...action.payload } };
    case showConstants.SUCCESS_DOWNLOAD_USERS:
      return { ...state, users: { ...action.payload } };
    default:
      return state;
  }
}
