import TruckLoader from "@/components/loaders/TruckLoader";
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <TruckLoader />
    </div>
  );
}