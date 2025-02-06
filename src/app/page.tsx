import Image from "next/image";
import Header from "./components/header/Index";
import Landing from "./components/Landing";

import Text3D from "./components/3D-text-main";

export default function Home() {
  return (
    <>
      <Header/>
      <Landing/>
      <Text3D/>
    </>
  );
}
