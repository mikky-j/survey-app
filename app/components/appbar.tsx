import axios from "axios";
import { useRouter } from "next/navigation";
import { Container } from "./container";

export const Appbar = () => {
  const router = useRouter();
  const handleClick = () => {
    axios
      .get("/api/logout")
      .then(() => {
        console.log("Logout successfully");
        router.refresh();
      })
      .catch(console.error);
  };
  return (
    <div className="bg-blue-500 text-white">
      <Container className="sticky top-0 w-4/5 py-3 flex items-center justify-between ">
        <p>Survey App</p>
        <button onClick={handleClick}>Logout</button>
      </Container>
    </div>
  );
};

export default Appbar;
