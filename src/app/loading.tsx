import Image from "next/image";
export default function Loading() {
  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center px-3 md:px-24 pb-20">
      <Image src="/icon-spinner.svg" width={200} height={200} alt="loader" />
    </div>
  );
}
