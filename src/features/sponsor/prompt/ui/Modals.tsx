import { BsCheckCircle } from 'react-icons/bs';
import theme from '../../../../shared/styles/theme';
import Modal from '../../../../shared/ui/Modal';

export const SubmitModal = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal
      icon={<BsCheckCircle size={32} color={theme.color.main} />}
      buttons={[
        {
          text: '취소',
          onClick: onCancel,
          bgColor: 'white',
          textColor: '#7C7F86',
          border: '1px solid #7C7F86',
        },
        {
          text: '확인',
          onClick: onConfirm,
          bgColor: theme.color.main,
          textColor: 'white',
        },
      ]}
    >
      제출시, 수정이 불가합니다.
      <br />
      제출하시겠습니까?
    </Modal>
  );
};

export const DeleteModal = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal
      icon={<BsCheckCircle size={32} color={theme.color.red} />}
      buttons={[
        {
          text: '취소',
          onClick: onCancel,
          bgColor: 'white',
          textColor: '#7C7F86',
          border: '1px solid #7C7F86',
        },
        {
          text: '삭제',
          onClick: onConfirm,
          bgColor: theme.color.red,
          textColor: 'white',
        },
      ]}
    >
      삭제시, 복원할 수 없습니다.
      <br />
      삭제하시겠습니까?
    </Modal>
  );
};
