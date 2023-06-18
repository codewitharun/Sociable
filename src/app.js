import axios from "axios";

window.addEventListener("DOMContentLoaded", () => {
  const apiResponseElement = document.getElementById("api-response");
  const email = "example@example.com";

  apiResponseElement.textContent="dfjdsfjkdjfsdjfkldsjflk"
  axios
    .get("/api/about", { email: email })

    .then((response) => {
      console.log(response);
      apiResponseElement.textContent = response.data;
    })
    .catch((error) => {
      const errorMessage = `Error: ${error.message}`;
      apiResponseElement.textContent = errorMessage;
      console.log(error);
    });
});
import axios from "axios";

window.addEventListener("DOMContentLoaded", () => {
  const apiResponseElement = document.getElementById("api-response");
  const email = "example@example.com";

  apiResponseElement.textContent="dfjdsfjkdjfsdjfkldsjflk"
  axios
    .get("/api/about", { email: email })

    .then((response) => {
      console.log(response);
      apiResponseElement.textContent = response.data;
    })
    .catch((error) => {
      const errorMessage = `Error: ${error.message}`;
      apiResponseElement.textContent = errorMessage;
      console.log(error);
    });
});
