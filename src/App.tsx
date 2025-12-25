import { Toaster } from "sonner";
import { useUser } from "./hooks/useUser";
import { Skeleton } from "./components/ui/Skeleton";
import { AuthForm } from "./components/AuthForm";
import RewardsPage from "./pages/RewardsPage";

function App() {
  const { user, loading } = useUser();  

  if (loading) {
    return (
      <Skeleton/>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <RewardsPage />
    </>
  );
}

export default App;