const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWU5MDdmMzA0NjAwMWFlNTlmODYiLCJpYXQiOjE3MTI5MTAxMTEsImV4cCI6MTcxNDExOTcxMX0.OhJKYlgod7nqRASogbda02Qwc0UfzLbvcrYPG4DPTTE";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URL = `https://striveschool-api.herokuapp.com/api/product/${id}`;

const isLoading = (bool) => {
  const loader = document.getElementById("loader");
  if (bool) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

window.onload = () => {
  isLoading(true);
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: myKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed!");
      }
    })
    .then((product) => {
      const footer = document.querySelector("footer");
      footer.classList.remove("d-none");

      const container = document.getElementById("detailsRow");

      const randomNumber = Math.floor(Math.random() * 100000);

      container.innerHTML = `
        
        
        <p>
        Art.-No | ${randomNumber} | ${product.brand}
      </p>
      <div class="col-lg-8">
        <div
          class="d-flex flex-column align-items-start justify-content-between"
        >
          <h2>${product.name}</h2>
          <div id="imgWrapper">
            <img
              src=${product.imageUrl}
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div
          class="d-flex flex-column align-items-end justify-content-between"
        >
          <p class="fs-1 text-danger fw-semibold">${product.price} €</p>
          <a href="#" class="text-dark">
            CONSEGNA GRATIS | Info su: Finanziamento, Prezzo, Quantità,
            Tempi consegna e Pickup IVA ed Eco-contributo RAEE incluse</a
          >
          <hr class="w-100" />
          <p>${product.description}</p>
          <hr class="w-100" />
          <div
            class="d-flex flex-row justify-content-between align-items-center w-100 gap-2"
          >
            <button class="btn btn-warning" style="width: 80%">
              <i class="bi bi-cart"></i> Aggiungi al carrello
            </button>

            <button class="btn btn-outline-secondary">
              <i class="bi bi-bookmark-heart text-dark"></i>
            </button>
          </div>
         

        </div>
        <a href="./index.html" class="btn btn-outline-secondary my-5 text-decoration-none">Torna alla homepage</a>
      </div>
        
        `;
    })
    .catch((error) => {
      console.log(error);

      const alertContainer = document.querySelector("#alertContainer");
      alertContainer.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        There was some problem, the product was not found
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
         
            `;

      const main = document.querySelector("main");
      const footer = document.querySelector("footer");

      main.remove();
      footer.remove();
    })
    .finally(() => {
      isLoading(false);
    });
};
