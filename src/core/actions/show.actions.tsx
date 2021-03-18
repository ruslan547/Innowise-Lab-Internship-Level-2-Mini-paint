import { ThunkAction } from 'redux-thunk';
import { showConstants } from '../constants/show.constants';
import { ShowState } from '../reducers/show.reducer';
import { firebaseDbService, Image } from '../services/firebase.db.service';

export const showActions = {
  getImages,
};

interface SuccessDownloadAction {
  type: typeof showConstants.SUCCESS_DOWNLOAD;
  payload: Record<string, Image>;
}

export type ShowAction = SuccessDownloadAction;

export type ShowThunkAction = ThunkAction<void, ShowState, unknown, ShowAction>;

function successDownload(data: Record<string, Image>): SuccessDownloadAction {
  return {
    type: showConstants.SUCCESS_DOWNLOAD,
    payload: data,
  };
}

function getImages(): ShowThunkAction {
  return (dispatch) => {
    firebaseDbService.onImages().then((data) => {
      dispatch(successDownload(data));
    });
  };
}
