import React, { useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { firebaseDbService } from '../../../../core/services/firebase.db.service';
import disk from '../../../../assets/img/disk.svg';
import { Id, toast, ToastContainer } from 'react-toastify';

interface SaveButtonProps {
  img: HTMLImageElement;
  isClean: boolean;
  currentUserId: string;
}

toast.configure();
let toastId: Id;

function SaveButton({ img, isClean, currentUserId }: SaveButtonProps) {
  const currentImg = useRef<string>('');

  const handleClick = useCallback(async () => {
    if (isClean) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error('Error: the template is clean', { position: toast.POSITION.TOP_CENTER });
      }
    } else if (currentImg.current === img.src) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error('Error: this image is already saved', { position: toast.POSITION.TOP_CENTER });
      }
    } else {
      try {
        await firebaseDbService.sendImg(img.src, currentUserId);
        toast.info('image saved', { position: toast.POSITION.TOP_CENTER });
      } catch (error) {
        const errorMessage = (error as unknown as { message: string })?.message || 'An unknown error occurred.';
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }

    currentImg.current = img.src;
  }, [isClean, img, currentUserId]);

  return (
    <div>
      <ToastContainer />
      <PaintButton onClick={handleClick}>
        <img src={disk} alt="" />
      </PaintButton>
    </div>
  );
}

function mapStateToProps({ drawReducer: { img, isClean }, authReducer: { currentUserId } }: RootSate) {
  return { img, isClean, currentUserId };
}

export default connect(mapStateToProps)(React.memo(SaveButton));
