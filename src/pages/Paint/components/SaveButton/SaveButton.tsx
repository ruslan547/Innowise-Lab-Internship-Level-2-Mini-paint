import { useRef } from 'react';
import { connect } from 'react-redux';
import { User } from '../../../../core/actions/auth.actions';
import PaintButton from '../../../../core/components/PaintButton/PaintButton';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { firebaseDbService } from '../../../../core/services/firebase.db.service';
import disk from '../../../../assets/img/disk.svg';
import { Id, toast, ToastContainer } from 'react-toastify';

interface SaveButtonProps {
  img: HTMLImageElement;
  user: User;
  isClean: boolean;
}

toast.configure();
let toastId: Id;

function SaveButton({ img, user, isClean }: SaveButtonProps) {
  const currentImg = useRef<string>('');

  const handleClick = async () => {
    if (currentImg.current !== img.src && !isClean) {
      try {
        await firebaseDbService.sendImg(img.src, user.email);
        toast.info('image saved', { position: toast.POSITION.TOP_CENTER });
      } catch ({ message }) {
        toast.error(message, { position: toast.POSITION.TOP_CENTER });
      }
    } else if (!toast.isActive(toastId)) {
      toastId = toast.error('this image is already saved', { position: toast.POSITION.TOP_CENTER });
    }

    currentImg.current = img.src;
  };

  return (
    <div>
      <ToastContainer />
      <PaintButton onClick={handleClick}>
        <img src={disk} alt="" />
      </PaintButton>
    </div>
  );
}

function mapStateToProps({ drawReducer: { img, isClean }, authReducer: { user } }: RootSate) {
  return { img, user, isClean };
}

export default connect(mapStateToProps)(SaveButton);
