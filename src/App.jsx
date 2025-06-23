import Table from "./componets/table";

function App() {
  return (
    <div className="w-auto h-auto bg-slate-900 flex justify-center p-6">
      <div className="w-[1400px] h-full flex flex-col">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Brokers Available
        </h1>
        <Table />
      </div>
    </div>
  );
}

export default App;
