const controlForm = document.getElementById("controlForm");
const defaultMessagesForm = document.getElementById("defaultMessagesForm");
const status = document.getElementById("status");

// Fonction pour envoyer les informations partagées
if (controlForm) {
  controlForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(controlForm);
    const data = Object.fromEntries(formData.entries());
    
    switch (data.shareTime) {
      case "5min":
        data.shareTime = 5 * 60 * 1000;
        break;
      case "5h":
        data.shareTime = 5 * 60 * 60 * 1000;
        break;
      case "10h":
        data.shareTime = 10 * 60 * 60 * 1000;
        break;
      case "15h":
        data.shareTime = 15 * 60 * 60 * 1000;
        break;
      case "24h":
        data.shareTime = 24 * 60 * 60 * 1000;
        break;
    }
    
    try {
      const response = await fetch("https://votre-api-externe.com/api/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        status.textContent = "Information partagée avec succès !";
        status.style.color = "green";
      } else {
        status.textContent = "Erreur: Échec de l'envoi.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Erreur: Impossible de se connecter au serveur.";
      status.style.color = "red";
    }
  });
}

// Fonction pour mettre à jour les messages initiaux
if (defaultMessagesForm) {
  defaultMessagesForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(defaultMessagesForm);
    const defaultMessages = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("https://votre-api-externe.com/api/defaultMessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultMessages),
      });
    
      if (response.ok) {
        status.textContent = "Messages initiaux mis à jour avec succès !";
        status.style.color = "green";
      } else {
        status.textContent = "Erreur: Échec de la mise à jour des messages.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Erreur: Impossible de se connecter au serveur.";
      status.style.color = "red";
    }
  });
}
