import Image from "next/image";
import AirPollution from "./Components/AirPollution/AirPollution";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import Navbar from "./Components/Navbar";


export default function Home() {
  return <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
    <Navbar />

    <div className="flex flex-col w-full">
      <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
        <AirPollution />
        <DailyForecast/>
      </div>
    </div>


    <footer className="py-4 flex justify-center pb-8">
      <p className="footer-text text-sm flex items-center gap-1">
        Made By
        <Image src={"/logo-white.svg"} alt="logo" width={20} height={20} />
        <a href="https://github.com/Saksham091" target="_blank" className="text-green-300 font-bold">
          Saksham Agarwal
        </a>
      </p>
    </footer>
  </main>;
}
