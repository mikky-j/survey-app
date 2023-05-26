"use client";
import Link from "next/link";
import { Container } from "./components/container";

const Home = () => {
  return (
    <div className="bg-[url('https://picsum.photos/2000')] w-screen h-screen bg-cover">
      <div className="w-full h-full bg-black/50 flex items-center justify-center text-white">
        <Container className="flex items-center flex-col">
          <p className="text-5xl font-semibold my-2">Survey App</p>
          <p className="w-1/2 text-center my-2">
            We believe that every voice deserves to be heard and that your
            opinions have the power to drive meaningful change.
          </p>
          <Link
            href={"/signup"}
            className="my-3 bg-white text-black p-3 rounded-md"
          >
            Get Started
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default Home;
