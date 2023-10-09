import "@popperjs/core";
import * as bootstrap from "bootstrap";
import "@/scss/main.scss";
import zatraziGrad from "./requests.js"; /**Kako bih mogao koristiti
zatraziGrad funkciju is requests.js file-a */

/**Trenutna prognoza dio---------------------------------------------------- */
const pretraziForm = document.querySelector(".search-location");
const korisnikovGrad = document.querySelector(".search-location input");
const imeGrada = document.querySelector("#city-name");
const tijeloAplikacije = document.querySelector(".card-body");
const slikaZaDanIliNoc = document.querySelector(".card-top img");
const info = document.querySelector(".back-card");
const inputKorisnika = document.querySelector("#input-vrijeme");

/**Vidljivost dio---------------------------------------------------------- */
const pretraziVoznju = document.querySelector(".search-voznja");
const voznjaGrad = document.querySelector(".search-voznja input");
const tijeloVoznjaDiv = document.querySelector(".card-voznja");
const slikaZaVidljivost = document.querySelector(".vidljivost-ikonica");
const inputVoznja = document.querySelector("#input-voznja");
const tekstZaVidljivost = document.querySelector(".tekst-za-vidljivost");
/** ------------------------------------------------------------------------*/

function kelvinUCelsius(kelvin) {
  let celsius = Math.round(kelvin - 273.15);
  return celsius;
}

/**Funkcija ispod provjerava je li dan ili noć
 * odnosno ako je noć ime ikonice zavšrava na "n",
 * ako je dan ime ikonice završava na "d"
 * Na ovaj način ćemo mijenjati sliku za dan i noć
 */
function jeLiDan(ikonica) {
  if (ikonica.includes("d")) {
    return true;
  }
  return false;
}

function provjeraVidljivosti(metri) {
  if (parseInt(metri) > 5000) {
    return true;
  }
  return false;
}

function azurirajVremenskuPrognozu(data) {
  imeGrada.textContent = data.name;
  const danNoc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; /**Kako bi dinamički fetchali ikonicu */

  tijeloAplikacije.innerHTML = `<div class="card-mid row">
  <div class="col-6 text-center temp">
    <span>${kelvinUCelsius(data.main.temp)}&deg;C</span>
  </div>
  <div class="col-6 condition-temp">
    <p class="condition">${data.weather[0].description}</p>
    <p class="high">${kelvinUCelsius(data.main.temp_max)}&deg;C</p>
    <p class="low">${kelvinUCelsius(data.main.temp_min)}&deg;C</p>
  </div>
</div>
</div>
<div class="icon-container card shadow m-auto rounded-5 align-items-center bg-subtle">
<img src="${danNoc}" alt="ikonica za vremensku prognozu"  />
</div>
<div class="card-bottom px-5 py-4 row">
<div class="col text-center real-feel">
  <p>${kelvinUCelsius(data.main.feels_like)}&deg;C</p>
  <span>Pravi Osjećaj</span>
</div>
<div class="col text-center humidity">
  <p>${data.main.humidity}%</p>
  <span>Vlažnost</span>
</div>
</div>`;

  if (jeLiDan(danNoc)) {
    slikaZaDanIliNoc.setAttribute("src", "./assets/images/image_day.svg");
  } else {
    slikaZaDanIliNoc.setAttribute("src", "./assets/images/image_night.svg");
  }
  info.classList.remove("d-none");
}

function azurirajVidljivost(data) {
  /**imeGradaVoznja.textContent = data.name;/** */
  const vozi = "./assets/images/car-front-fill.svg";
  const neVozi = "./assets/images/sign-stop-fill.svg";

  tijeloVoznjaDiv.innerHTML = `<div class="city name my-3">
    <p id="city-name-voznja">${data.name}</p>
    <span>Vidljivost: ${data.visibility} metara</span>
  </div>`;

  if (provjeraVidljivosti(data.visibility)) {
    slikaZaVidljivost.setAttribute("src", vozi);
    tijeloVoznjaDiv.appendChild(slikaZaVidljivost);
    tekstZaVidljivost.textContent =
      "Vidljivost je dobra, ali provjeri vremensku prognozu isto!";
    tijeloVoznjaDiv.appendChild(tekstZaVidljivost);
  } else {
    slikaZaVidljivost.setAttribute("src", neVozi);
    tijeloVoznjaDiv.appendChild(slikaZaVidljivost);
    tekstZaVidljivost.textContent =
      "Vidljivost nije dobra, pokušaj odgoditi vožnju!";
    tijeloVoznjaDiv.appendChild(tekstZaVidljivost);
  }
  tijeloVoznjaDiv.classList.remove("d-none");
}

pretraziForm.addEventListener("submit", (event) => {
  event.preventDefault(); /**Kada korisnik pritisne enter prevenira defaultno ponašanje */
  const pretrazeniGrad = korisnikovGrad.value.trim();
  console.log(pretrazeniGrad);
  pretraziForm.reset(); /**Resetira value u formi */

  inputKorisnika.placeholder = "Unesite grad za koji želite vidjeti prognozu";

  zatraziGrad(pretrazeniGrad)
    .then((data) => {
      console.log(data);
      azurirajVremenskuPrognozu(data);
    })
    .catch((error) => {
      console.log(error);
      inputKorisnika.placeholder = "Molimo unesite valjano ime grada";
    });
});

pretraziVoznju.addEventListener("submit", function (event) {
  event.preventDefault();
  const pretrazenaVoznja = voznjaGrad.value.trim();
  console.log(pretrazenaVoznja);
  pretraziVoznju.reset();
  inputVoznja.placeholder = "Unesite grad za koji želite vidjeti vidljivost";
  zatraziGrad(pretrazenaVoznja)
    .then((data) => {
      console.log(data);
      azurirajVidljivost(data);
    })
    .catch((error) => {
      console.log(error);
      inputVoznja.placeholder = "Molimo unesite valjano ime grada";
    });
});

/**Funkcija koja zatvara navbar prilikom
 * klika na bilo koji dio stranice
 * Nisam uspio na način na koji si mi objasnila na mejlu
 */
const navbar = document.querySelector(".navbar");
const togglerBtn = document.getElementById("navbar-toggler");
const navbarSadrzaj = document.querySelector(".navbar-collapse");
document.addEventListener("click", function (e) {
  if (
    navbarSadrzaj.classList.contains("show") &&
    !navbar.contains(e.target) &&
    e.target !== togglerBtn
  ) {
    togglerBtn.click();
  }
});
