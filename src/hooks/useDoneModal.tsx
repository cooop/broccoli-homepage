import { useCallback, useMemo, useState } from "react";
import { Modal } from "../components/modal/Modal";

// modal show when user successfully request invite
export const useDoneModal = () => {
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const onDoneModalOk = useCallback(() => {
    setIsDoneModalOpen(false);
  }, []);
  const onDoneModalCancel = useCallback(() => {
    setIsDoneModalOpen(false);
  }, []);
  const doneModalContent = useMemo(() => {
    return (
      <>
        <p>You will be one of the first to experience</p>
        <p>Broccoli & Co. when we launch.</p>
      </>
    );
  }, []);

  return {
    doneModal: (
      <Modal
        isOpen={isDoneModalOpen}
        title="All done!"
        onOk={onDoneModalOk}
        onCancel={onDoneModalCancel}
      >
        {doneModalContent}
      </Modal>
    ),
    setIsDoneModalOpen,
  };
};
