import { ThunkAction } from 'redux-thunk';
import { showConstants } from '../constants/show.constants';
import { ShowState } from '../reducers/show.reducer';
import { firebaseDbService, Image } from '../services/firebase.db.service';

export const showActions = {
  getImages,
  sort,
};

interface SuccessDownloadAction {
  type: typeof showConstants.SUCCESS_DOWNLOAD;
  payload: Record<string, Image>;
}

interface SortAction {
  type: typeof showConstants.SORT;
  payload: string;
}

export type ShowAction = SuccessDownloadAction | SortAction;

export type ShowThunkAction = ThunkAction<void, ShowState, unknown, ShowAction>;

function successDownload(data: Record<string, Image>): SuccessDownloadAction {
  return {
    type: showConstants.SUCCESS_DOWNLOAD,
    payload: data,
  };
}

function sort(key: string): SortAction {
  return {
    type: showConstants.SORT,
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
