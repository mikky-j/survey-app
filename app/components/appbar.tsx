import axios from "axios";
import { useRouter } from "next/navigation";
import { Container } from "./container";
import Link from "next/link";

export const Appbar = () => {
  const router = useRouter();
  const handleClick = () => {
    axios
      .get("/api/logout")
      .then((data) => {
        router.refresh();
      })
      .catch(console.error);
  };
  return (
    <div className="bg-blue-500 text-white">
      <Container className="sticky top-0 w-4/5 py-3 flex items-center justify-between ">
        <Link href="/">Survey App</Link>
        <button onClick={handleClick}>Logout</button>
      </Container>
    </div>
  );
};

export default Appbar;
