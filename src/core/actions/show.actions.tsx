import { ThunkAction } from 'redux-thunk';
import { showConstants } from '../constants/show.constants';
import { ShowState } from '../reducers/show.reducer';
import { firebaseDbService, Image } from '../services/firebase.db.service';
import { User } from './auth.actions';

export const showActions = {
  getImages,
  filterImages,
  setImages,
  getUsers,
};

interface SuccessDownloadAction {
  type: typeof showConstants.SUCCESS_DOWNLOAD;
  payload: Record<string, Image>;
}

interface FilterImagesAction {
  type: typeof showConstants.FILTER_IMAGES;
  payload: string;
}

interface SetImagesAction {
  type: typeof showConstants.SET_IMAGES;
  payload: Record<string, Image>;
}

interface SuccessDownloadUsersAction {
  type: typeof showConstants.SUCCESS_DOWNLOAD_USERS;
  payload: Record<string, User>;
}

export type ShowAction = SuccessDownloadAction | FilterImagesAction | SetImagesAction | SuccessDownloadUsersAction;

export type ShowThunkAction = ThunkAction<void, ShowState, unknown, ShowAction>;

function successDownload(data: Record<string, Image>): SuccessDownloadAction {
  return {
    type: showConstants.SUCCESS_DOWNLOAD,
    payload: data,
  };
}

function successDownloadUsers(data: Record<string, User>): SuccessDownloadUsersAction {
  return {
    type: showConstants.SUCCESS_DOWNLOAD_USERS,
    payload: data,
  };
}

function setImages(images: Record<string, Image>): SetImagesAction {
  return {
    type: showConstants.SET_IMAGES,
    payload: images,
  };
}

function filterImages(key: string): FilterImagesAction {
  return {
    type: showConstants.FILTER_IMAGES,
    payload: key,
  };
}

function getImages(): ShowThunkAction {
  return (dispatch) => {
    firebaseDbService.onImages().then((data) => {
      dispatch(successDownload(data));
    });
  };
}

function getUsers(): ShowThunkAction {
  return (dispatch) => {
    firebaseDbService.onUsers().then((data) => {
      dispatch(successDownloadUsers(data));
    });
  };
}
