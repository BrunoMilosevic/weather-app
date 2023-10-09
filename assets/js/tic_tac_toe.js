const celije = document.querySelectorAll(".celija");
const informacije = document.querySelector("#informacije");
const restartBtn = document.querySelector("#restart");

const pobjednickeKombinacije = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let opcije = ["", "", "", "", "", "", "", "", ""];
let potez = "Sunce";
let jeLiIgra = false;
inicirajIgricu();

function inicirajIgricu() {
  /**dodaje event listener za svaku čeliju */
  celije.forEach((celija) => celija.addEventListener("click", klikniCeliju));
  restartBtn.addEventListener("click", resetirajIgricu);
  informacije.textContent = `${potez} je na potezu`;
  jeLiIgra = true;
}

function klikniCeliju() {
  const indeksCelije = this.getAttribute("indeksCelije");

  if (opcije[indeksCelije] != "" || !jeLiIgra) {
    return;
  }

  azurirajCeliju(this, indeksCelije);

  provjeriPobjednika();
}

function azurirajCeliju(celija, index) {
  const novaSlika = document.createElement("img");
  const dodajSlikuSunca = "./assets/images/sunce_tic_tac_toe.svg";
  const dodajSlikuKise = "./assets/images/kisa_tic_tac_toe.svg";
  opcije[index] = potez;
  if (opcije[index] == "Sunce") {
    novaSlika.setAttribute("src", dodajSlikuSunca);
    celija.append(novaSlika);
  } else {
    novaSlika.setAttribute("src", dodajSlikuKise);
    celija.append(novaSlika);
  }
}

function promijeniPotez() {
  potez = potez == "Sunce" ? "Kiša" : "Sunce";
  informacije.textContent = `${potez} je na potezu`;
}
function provjeriPobjednika() {
  let pobjeda = false;

  for (let i = 0; i < pobjednickeKombinacije.length; i++) {
    const uvjet = pobjednickeKombinacije[i];
    const celijaA = opcije[uvjet[0]];
    const celijaB = opcije[uvjet[1]];
    const celijaC = opcije[uvjet[2]];

    if (celijaA == "" || celijaB == "" || celijaC == "") {
      continue;
    }
    if (celijaA == celijaB && celijaB == celijaC) {
      pobjeda = true;
      break;
    }
  }

  if (pobjeda) {
    informacije.textContent = `${potez} je pobijedilo/pobijedila`;
    jeLiIgra = false; /**Ukoliko se uvjeti za pobjedu ispune igra prestaje */
  } else if (!opcije.includes("")) {
    informacije.textContent = "Neriješeno";
    jeLiIgra = false;
  } else {
    promijeniPotez();
  }
}

function resetirajIgricu() {
  potez = "Sunce";
  opcije = ["", "", "", "", "", "", "", "", ""];
  informacije.textContent = `${potez} je na potezu`;
  celije.forEach((celija) => (celija.textContent = ""));
  jeLiIgra = true;
}
