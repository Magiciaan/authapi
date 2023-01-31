const SignupButton = document.querySelector("#SignupSubmit");

SignupButton.addEventListener("click", async (e) => {
  const postReqEmail = document.getElementById("signupEmail").value;
  const postReqPass = document.querySelector("#signupPassword").value;
  const errorP = document.querySelector(".forerrors");
  try {
    const res = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ Email: postReqEmail, password: postReqPass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.errors) {
      errorP.innerHTML = `${data.errors.Email} </p> ${data.errors.password}`;
    } else {
      errorP.innerHTML = `Account Created`;
      window.location.assign("/loggedin"); //this is used to redirect after users created
    }
  } catch (err) {
    console.log(err);
  }
});
