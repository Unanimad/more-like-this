import LeftMenu from "@/components/LeftMenu";

export default function Home() {
  return (
    <>
      <div className="h-[120vh]">
        <LeftMenu isOpen={true} />
      </div>
    </>
  );
}
