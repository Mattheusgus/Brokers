import { useEffect, useState } from "react";
import { checkBrokers } from "../utils/consultBrokers";
import { ArrowDownNarrowWide } from "lucide-react";

function Table() {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const fetchedBrokers = await checkBrokers();
        setBrokers(fetchedBrokers);
      } catch (err) {
        console.error("Error fetching brokers:", err);
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="h-screen p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-xl flex flex-col items-center justify-center">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full leading-normal">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
            <tr>
              <div className="flex justify-between">
                <th
                  scope="col"
                  className="py-4 px-6 text-left text-sm font-semibold tracking-wider rounded-tl-lg"
                >
                  Name
                </th>
                <button
                  onClick={() => {
                    setBrokers((prevBrokers) => [...prevBrokers].reverse());
                  }}
                  className="cursor-pointer"
                >
                  <ArrowDownNarrowWide />
                </button>
              </div>

              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold tracking-wider"
              >
                City
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold tracking-wider rounded-tr-lg"
              >
                CNPJ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Carregando dados...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-sm text-red-500"
                >
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && brokers.length > 0
              ? brokers.map((broker) => (
                  <tr
                    key={broker.cnpj || broker.nome_social}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {broker.nome_social}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {broker.municipio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {broker.cnpj}
                    </td>
                  </tr>
                ))
              : !loading &&
                !error && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Nenhuma corretora encontrada.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
