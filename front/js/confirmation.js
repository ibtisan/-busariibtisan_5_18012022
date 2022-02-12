const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

// Récupération du numéro de commande
function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

// Affichage du numéro de commande
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

// Suppression du numéro de commande
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}
