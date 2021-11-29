const ramenMenu = document.querySelector('#ramen-menu')
const detailImage = document.querySelector('.detail-image')
const detailName = document.querySelector('.name')
const detailRestaurant = document.querySelector('.restaurant')
const detailRating = document.querySelector('span')
const detailComment = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')
const placeHolderImage = "./assets/image-placeholder.jpg"

newRamenForm.addEventListener('submit', ramen => {
    ramen.preventDefault()
    console.log(ramen)
    renderNewRamen(ramen)
})

function loadRamens(){
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramens => {
        ramens.forEach(ramen => {
            renderRamens(ramen)
        })
    })
}

function renderRamens(ramen){
    ramenImg = document.createElement('img')
    ramenImg.setAttribute('id',ramen.id)
    ramenImg.src = ramen.image
    ramenImg.addEventListener('click', e => {
        console.log(e)
        let ramenId = e.path[0].id
        fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            renderDetails(data)
        })
    })
    ramenMenu.appendChild(ramenImg)
}

loadRamens()

function renderDetails(data){
    let restaurantName = data.restaurant
    detailRestaurant.innerHTML = restaurantName
    let ramenName = data.name
    detailName.innerHTML = ramenName
    let ramenComment = data.comment
    detailComment.innerHTML = ramenComment
    let ramenRating = data.rating
    detailRating.innerHTML = ramenRating
    let ramenImage = data.image
    detailImage.src = ramenImage
    
}

function renderNewRamen(newRamen){
    newName = newRamen.target[0].value
    newRestaurant = newRamen.target[1].value
    newImage = newRamen.target[2].value
    newRating = newRamen.target[3].value
    newComment = newRamen.target[4].value

    let newThumbnail = document.createElement('img')
    newThumbnail.src = placeHolderImage
    detailImage.src = placeHolderImage
    detailComment.innerHTML = newComment
    detailRating.innerHTML = newRating
    detailRestaurant.innerHTML = newRestaurant
    detailName.innerHTML = newName
    
    ramenMenu.appendChild(newThumbnail)
}
