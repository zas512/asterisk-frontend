import SipTable from "./components/SipTable";

function App() {
  return (
    <>
      <div className="flex-col items-center justify-center w-screen h-screen bg-gray-100">
        <h1 className="p-5 text-2xl font-semibold text-center text-gray-800">
          Add Peers To Sip.conf
        </h1>
        <div className="flex justify-center">
          <SipTable />
        </div>
      </div>
    </>
  );
}

export default App;
