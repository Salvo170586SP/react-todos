export default function FleshMessages({ flashMessage }) {
  return (
    <>
      <div className="border rounded-lg border-zinc-50 bg-white p-3 font-semibold shadow-lg text-black">
        {flashMessage}
      </div>
    </>
  );
}
