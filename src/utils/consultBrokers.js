const apiURL = "https://node-red-production-cc3e.up.railway.app/";
// const apiURL = "http://localhost:1880/";

export async function checkBrokers() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${apiURL}carregar-corretoras`,
      requestOptions
    );
    const result = await response.json();
    const filteredJson = result.filter(
      (broker) => broker.status !== "CANCELADA"
    );
    return filteredJson;
  } catch (error) {
    console.error("Erro ao consultar Corretoras:", error);
    throw error;
  }
}
