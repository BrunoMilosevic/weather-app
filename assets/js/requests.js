import axios from "axios";
const myKey = "1e764cc7e48b0a4945c4048c2b82f332";
const glavniUrl = "https://api.openweathermap.org/data/2.5/weather";
async function getData(url, upit) {
  try {
    const { data } = await axios.get(url + upit);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

/**Chat-Gpt pristup pomoću kojeg sam eksportao dolje navedenu funkciju */
export default async function zatraziGrad(grad) {
  const upit = `?q=${grad}&appid=${myKey}`; /**Kako bi dinamički mogli zatražiti grad koji korisnik upiše */

  return getData(glavniUrl, upit); /**Kako bih kasnije mogao koristiti dobivene 
  podatke iz funkcije */
}

zatraziGrad("Osijek");
