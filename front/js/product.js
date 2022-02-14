const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}

// Récupération des articles de l'API 
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))
    
// Répartion des données de l'API dans le DOM 
const handleData = (kanap) => {
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
const makeImage = (imageUrl, altTxt) => {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)

}

// Modification du titre "h1" 
const makeTitle = (name) => {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name

}

// Modification du prix  
const makePrice = (price) => {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}


// Modification de la description 
const makeDescription = (description) =>{
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

// Insertion des options couleurs 
const makeColors = (colors) => {
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

const handleClick = () => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    
    if (isOrderInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}
button.addEventListener("click", handleClick)

// Importation dans le localstorage
const saveOrder = (color, quantity) => {
    const key = `${id}-${color}`
    const data = {
        id: key,
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
    if (color === "" ) {
        alert("Choisissez une couleur SVP")
        return true
    } 
    if (quantity == 0 || quantity > 100 ) {
        alert("Saisissez une quantitée inférieur à 100")
        return true
    } 
}

// Redirection vers la page panier
const redirectToCart = () => {
    window.location.href = "cart.html"
}