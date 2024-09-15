import { useCallback } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { useDoneModal } from "./hooks/useDoneModal";
import { useInviteModal } from "./hooks/useInviteModal";
function App() {
  const { doneModal, setIsDoneModalOpen } = useDoneModal();

  const onInviteModelOpen = useCallback(() => {
    setIsDoneModalOpen(true);
  }, [setIsDoneModalOpen]);

  const { inviteModal, setIsInviteModalOpen } =
    useInviteModal(onInviteModelOpen);

  return (
    <div className="homepage">
      <Header />
      <div className="main">
        <h1 className="title">A better way</h1>
        <h1 className="title">to enjoy every day</h1>
        <p className="description">Be the first to know when we launch.</p>
        <button
          className="button"
          onClick={() => {
            setIsInviteModalOpen(true);
          }}
        >
          Request an invite
        </button>
      </div>
      <Footer />
      {doneModal}
      {inviteModal}
    </div>
  );
}

export default App;
