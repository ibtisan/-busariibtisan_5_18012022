// Récupération des articles de l'API
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

    // Répartition des données de l'API dans le DOM
    function addProducts(kanaps) {
      kanaps.forEach((kanap) => {
            
        const { _id, imageUrl, altTxt, name, description } = kanap

        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = makeImageDiv(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraphe(description)
        appendElementsToArticle(article, [image, h3, p])
        appendArticleToAnchor(anchor, article)
      })
    }

        // Insertion des éléments "image", "h3", et "p", dans "article" 
        function appendElementsToArticle(article, array) {
            array.forEach((item) => {
              article.appendChild(item)
            })
            /*article.appendChild(image)
            //article.appendChild(h3)
            //article.appendChild(p)*/
        }

        // Création de l'élément "a"
        function makeAnchor(id) {
          const anchor = document.createElement("a")
          anchor.href = "./product.html?id=" + id
          return anchor
        }

        // Insertion de l'éléments "a" dans l'élément "article"
        // Insertion de l'éléments "article" dans la div "item"

        function appendArticleToAnchor(anchor, article) {
          const items = document.querySelector("#items")
          if (items != null) {
              items.appendChild(anchor)
              anchor.appendChild(article)
          }
        }

        // Création de l'image
        function makeImageDiv(imageUrl, altTxt) {
          const image = document.createElement("img")
          image.src = imageUrl
          image.alt = altTxt
          return image
        }

        // Création du titre "h3"
        function makeH3(name) {
          const h3 = document.createElement("h3")
          h3.textContent = name
          h3.classList.add("productName")
          return h3
        }

        // Création de la description "p"élément "a"
        function makeParagraphe(description) {
          const p = document.createElement("p")
          p.textContent = description
          p.classList.add("productDescription")
          return p
        }