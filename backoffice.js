const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWU5MDdmMzA0NjAwMWFlNTlmODYiLCJpYXQiOjE3MTI5MTAxMTEsImV4cCI6MTcxNDExOTcxMX0.OhJKYlgod7nqRASogbda02Qwc0UfzLbvcrYPG4DPTTE";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URL = id
  ? `https://striveschool-api.herokuapp.com/api/product/${id}`
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = id ? "PUT" : "POST";

window.onload = () => {
  const form = document.querySelector("form");

  const resetButton = document.getElementById("resetButton");

  resetButton.addEventListener("click", (event) => {
    const confirmed = confirm("Are you sure you want to reset the form?");
    if (!confirmed) {
      event.preventDefault();
    }
  });

  form.addEventListener("submit", (event) => {
    console.log(event);
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const image = document.getElementById("image").value;
    const price = document.getElementById("price").value;
    const newProduct = {
      name: name,
      description: description,
      brand: brand,
      imageUrl: image,
      price: price,
    };

    const confirmed = confirm(
      `Are you sure you want to ${id ? "modify" : "create"} this product?`
    );

    if (confirmed) {
      fetch(URL, {
        method: method,
        body: JSON.stringify(newProduct),
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

        .then((createdProduct) => {
          if (id) {
            const alertContainer = document.querySelector("#alertContainer");
            const alert = document.createElement("div");
            alert.classList.add("alert", "alert-success", "mt-3");
            alert.innerHTML = `The product <strong>${createdProduct.name}</strong> has been modified successfully`;

            alertContainer.appendChild(alert);

            setTimeout(() => {
              alert.remove();

              window.location.href = "./index.html";
            }, 2000);
          } else {
            const alertContainer = document.querySelector("#alertContainer");
            const alert = document.createElement("div");
            alert.classList.add("alert", "alert-success", "mt-3");
            alert.innerHTML = `The product <strong>${createdProduct.name}</strong> has been created successfully`;

            alertContainer.appendChild(alert);

            setTimeout(() => {
              alert.remove();
              window.location.href = "./index.html";
            }, 2000);

            event.target.reset();
          }
        })
        .catch((error) => {
          console.log(error);

          const alertContainer = document.querySelector("#alertContainer");
          alertContainer.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
          There was some problem, the product was not added
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
           
              `;
        });
    }
  });

  const subtitle = document.getElementById("subtitle");
  const formSubmit = document.getElementById("formSubmit");
  const deleteIcon = document.getElementById("deleteIcon");
  const deleteButton = document.getElementById("deleteButton");

  if (id) {
    subtitle.innerHTML = "- Edit product";
    formSubmit.classList.remove("btn-primary");
    formSubmit.classList.add("btn-success");
    formSubmit.innerText = "Update";

    deleteIcon.classList.remove("d-none");

    deleteButton.addEventListener("click", () => {
      fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: myKey,
        },
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("Request failed!");
          }
        })
        .then((deletedProduct) => {
          const deleteModal = document.getElementById("deleteModal");
          deleteModal.remove();
          const alertContainer = document.querySelector("#alertContainer");
          const alert = document.createElement("div");
          alert.classList.add("alert", "alert-danger", "mt-3");
          alert.innerHTML = `The product <strong>${deletedProduct.name}</strong> has been deleted successfully`;

          alertContainer.appendChild(alert);
          

          setTimeout(() => {
            alert.remove();

            window.location.href = "./index.html";
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          const alertContainer = document.querySelector("#alertContainer");
          alertContainer.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
          There was some problem, the product was not deleted!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
           
              `;
        });
    });

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: myKey,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Request failed!");
        }
      })
      .then((product) => {
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("image").value = product.imageUrl;
        document.getElementById("price").value = product.price;

        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `Are you sure that you want to delete <strong>${product.name}</strong>?`;

        const modalTitle = document.querySelector(".modal-title");
        modalTitle.innerHTML = `Delete this product?`;
      })
      .catch((error) => {
        console.log(error);
        const alertContainer = document.querySelector("#alertContainer");
        alertContainer.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        There was some problem, the product was not found!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
         
            `;
      });
  } else {
    subtitle.innerHTML = "- Add new product";
  }
};
