const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}
/*let imgUrl, altText*/

// Récupération des articles de l'API 
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))
    
// Répartion des données de l'API dans le DOM 
function handleData(kanap) {
    /*const altTxt = kanap.altTxt
    const colors = kanap.colors
    const description = kanap.description
    const imageUrl = kanap.imageUrl
    const name = kanap.name
    const price = kanap.price
    const _id = kanap._id*/
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

// Insertion de l'image 
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)

}

// Modification du titre "h1" 
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name

}

// Modification du prix  
function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}


// Modification de la description 
function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

// Insertion des options couleurs 
function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

// Ecoute et Gestion du panier 
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    
    if (isOrderInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}
        // Importation dans le localstorage
        function saveOrder(color, quantity) {
            const key = `${id}-${color}`
            const data = {
                id: id,
                color: color,
                quantity: Number(quantity),
                price: itemPrice,
                imageUrl: imgUrl,
                altTxt: altText,
                name: articleName
            }
            localStorage.setItem(key, JSON.stringify(data))
        }

        // Vérification de la validité du panier avec une couleur et une quantitée non nul  et <100 
        function isOrderInvalid(color, quantity) {
            if (color == null || color === "" || quantity == null || quantity == 0 || quantity > 100 ) {
                alert("Please select a color and quantity less than 100")
                return true
            } 
        }

        // Redirection vers la page panier
        function redirectToCart() {
            window.location.href = "cart.html"
        }