import { Button, Modal } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserEducation,
  setUserStatusCode,
} from "../../store/slices/user";
import { State } from "../../store/store";
import { useEffect } from "react";

export interface IDeleteEducationModalProps {
  isModalOpen: boolean;
  onModalClose(): void;
  itemId: string;
}

export default function DeleteEducationModal(
  props: IDeleteEducationModalProps
) {
  const dispatch = useDispatch();
  const { isModalOpen, itemId, onModalClose } = props;

  const { statusCode } = useSelector((state: State) => state.entities.user);

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setUserStatusCode(null));
      onModalClose();
    }
  }, [statusCode]);

  const handleDeleteItem = () => {
    dispatch(deleteUserEducation(itemId));
  };

  return (
    <Modal show={isModalOpen} size="sm" onClose={onModalClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this education? This cannot be
            undone.
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteItem}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="dark" onClick={onModalClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
