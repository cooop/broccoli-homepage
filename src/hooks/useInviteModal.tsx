import { useCallback, useMemo, useState } from "react";
import { Modal } from "../components/modal/Modal";
import { useInput } from "./useInput";
import { validateInvite } from "../utils/request";
import {
  validateConfirmEmail,
  validateEmail,
  validateFullName,
} from "../utils/validator";

// modal show when user start to request invite
export const useInviteModal = (onRequestInviteSuccess: () => void) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isInviteSending, setIsInviteSending] = useState(false);
  const [inviteErrorMessage, setInviteErrorMessage] = useState("");

  const {
    value: fullName,
    setValid: setFullNameValid,
    ref: fullNameRef,
    clear: clearFullName,
    input: fullNameInput,
  } = useInput("Full name", "Full name must be at least 3 characters long");

  const {
    value: email,
    setValid: setEmailValid,
    ref: emailRef,
    clear: clearEmail,
    input: emailInput,
  } = useInput("Email", "Email is not valid");

  const {
    value: confirmEmail,
    setValid: setConfirmEmailValid,
    ref: confirmEmailRef,
    clear: clearConfirmEmail,
    input: confirmEmailInput,
  } = useInput("Confirm email", "Emails do not match");

  // check valid locally
  const checkValid = useCallback(
    (focus = false) => {
      const isFullNameValid = validateFullName(fullName);
      setFullNameValid(isFullNameValid);
      if (focus && !isFullNameValid) {
        fullNameRef.current?.focus();
        focus = false;
      }

      const isEmailValid = validateEmail(email);
      setEmailValid(isEmailValid);
      if (focus && !isEmailValid) {
        emailRef.current?.focus();
        focus = false;
      }

      const isConfirmEmailValid = validateConfirmEmail(email, confirmEmail);
      setConfirmEmailValid(isConfirmEmailValid);
      if (focus && !isConfirmEmailValid) {
        confirmEmailRef.current?.focus();
        focus = false;
      }

      return isFullNameValid && isEmailValid && isConfirmEmailValid;
    },
    [
      fullName,
      email,
      confirmEmail,
      fullNameRef,
      emailRef,
      confirmEmailRef,
      setFullNameValid,
      setEmailValid,
      setConfirmEmailValid,
    ]
  );

  // clear all state for reusing
  const clear = useCallback(() => {
    setIsInviteModalOpen(false);
    setIsInviteSending(false);
    setInviteErrorMessage("");
    clearFullName();
    clearEmail();
    clearConfirmEmail();
  }, [clearFullName, clearEmail, clearConfirmEmail]);

  const onInviteModalOk = useCallback(async () => {
    // check valid locally
    if (!checkValid(true)) {
      return;
    }

    // send invite request
    setIsInviteSending(true);
    const res = await validateInvite(fullName, email);
    setIsInviteSending(false);
    if (res.success) {
      // request invite success
      clear();
      onRequestInviteSuccess();
    } else {
      // request invite failed
      setInviteErrorMessage(res.message);
      return;
    }
  }, [onRequestInviteSuccess, checkValid, clear, fullName, email]);

  const onInviteModalCancel = useCallback(() => {
    clear();
  }, [clear]);

  const inviteModalContent = useMemo(() => {
    return (
      <>
        {fullNameInput}
        {emailInput}
        {confirmEmailInput}
      </>
    );
  }, [fullNameInput, emailInput, confirmEmailInput]);

  return {
    inviteModal: (
      <Modal
        isOpen={isInviteModalOpen}
        title="Request an invite"
        onOk={onInviteModalOk}
        okDisabled={isInviteSending}
        okText={isInviteSending ? "Sending, please wait..." : "Send"}
        onCancel={onInviteModalCancel}
        errorMessage={inviteErrorMessage}
      >
        {inviteModalContent}
      </Modal>
    ),
    setIsInviteModalOpen,
  };
};
