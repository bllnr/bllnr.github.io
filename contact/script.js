document
    .getElementById("contact-form-element")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const form = this;
        const submitButton = document.getElementById("form-button");
        const webAppUrl =
            "https://script.google.com/macros/s/AKfycbwRx7wYZKSLG63vViRU79ff_hHaaMQP6KBUTIvrNOItF0SZz_muZ0H5J_Rcry84Ecvl/exec";

        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        // Clean and modern way to parse form data for Google Scripts
        const formData = new URLSearchParams(new FormData(form));

        fetch(webAppUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result === "success") {
                    alert(
                        "Thank you! Your message has been sent successfully.",
                    );
                    form.reset();
                } else {
                    alert(
                        "There was an error saving your message. Please try again.",
                    );
                    console.error(data.error);
                }
            })
            .catch((error) => {
                alert("An error occurred while submitting. Please try again.");
                console.error("Error!", error.message);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerText = "Send message";
            });
    });
