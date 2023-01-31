const LoginButton = document.querySelector("#LoginSubmit");

LoginButton.addEventListener("click", async (f) => {
  const loggingEmail = document.querySelector("#loginEmail").value;
  const loggingPass = document.querySelector("#loginPassword").value;
  const forErrors = document.querySelector(".forerrors");

  try {
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ Email: loggingEmail, password: loggingPass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.errors) {
      forErrors.innerHTML = `${data.errors.Email} </p> ${data.errors.password}`;
    } else {
      forErrors.innerHTML = `Logged In`;
      window.location.assign("/loggedin"); //this is used to redirect after users created
    }
  } catch (err) {
    console.log(err.message);
  }
});
