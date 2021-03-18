import { useRef } from 'react';
import { connect } from 'react-redux';
import { User } from '../../../../core/actions/auth.actions';
import { drawActions } from '../../../../core/actions/draw.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { drawService } from '../../../../core/services/draw.service';
import { firebaseDbService } from '../../../../core/services/firebase.db.service';

interface SaveButtonProps {
  dispatch: Dispatch;
  img: HTMLImageElement;
  user: User;
  context: CanvasRenderingContext2D | null;
}

function SaveButton({ dispatch, img, user, context }: SaveButtonProps) {
  const currentImg = useRef<string>('');

  const handleClick = async () => {
    if (currentImg.current !== img.src) {
      await firebaseDbService.sendImg(img.src, user.email);
    }
    currentImg.current = img.src;
    dispatch(drawActions.deleteImg());

    if (context) {
      drawService.clearCanvas(context);
    }
  };

  return <PaintButton onClick={handleClick}>Save</PaintButton>;
}

function mapStateToProps({ drawReducer: { img, dispatch, context }, authReducer: { user } }: RootSate) {
  return { dispatch, img, user, context };
}

export default connect(mapStateToProps)(SaveButton);
