import { Button, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import customBtnTheme from "../../utils/customBtnTheme";
import { IJob } from "../../interfaces/Job";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, setJobStatusCode } from "../../store/slices/job";
import { State } from "../../store/store";

interface DeleteJobModalProps {
  currJob: IJob;
  isShowModal: boolean;
  onCloseModal(): void;
}

function DeleteJobModal({
  currJob,
  isShowModal,
  onCloseModal,
}: DeleteJobModalProps) {
  const dispatch = useDispatch();
  const { statusCode, loading } = useSelector(
    (state: State) => state.entities.job
  );

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setJobStatusCode(null));
      onCloseModal();
    }
  }, [statusCode]);

  const handleDeleteJob = () => {
    dispatch(deleteJob(currJob._id));
  };

  return (
    <Modal size="sm" show={isShowModal} onClose={onCloseModal}>
      <Modal.Header>Delete {currJob.title}?</Modal.Header>
      <Modal.Body>
        <h1 className=" text-zinc-600">
          After you delete this job, you will no longer have access to it. Are
          you sure you want to delete this job?
        </h1>

        <div className="flex gap-4 mt-5">
          <Button
            outline
            pill
            color="blue"
            theme={customBtnTheme}
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button
            pill
            color="blue"
            theme={customBtnTheme}
            onClick={handleDeleteJob}
            isProcessing={loading}
          >
            Delete Draft
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteJobModal;
