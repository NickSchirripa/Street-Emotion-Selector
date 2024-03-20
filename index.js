import { streetData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderStreet)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderStreet(){
    const streetObject = getSingleStreetObject()
    memeModalInner.innerHTML =  `
        <img 
        class="street-img" 
        src="./images/${streetObject.image}"
        alt="${streetObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getSingleStreetObject(){
    const streetArray = getMatchingStreetArray()
    
    if(streetArray.length === 1){
        return streetArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * streetArray.length)
        return streetArray[randomNumber]
    }
}

function getMatchingStreetArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingStreetArray = streetData.filter(function(street){
            
            if(isGif){
                return street.emotionTags.includes(selectedEmotion) && street.isGif
            }
            else{
                return street.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingStreetArray 
    }  
}

function getEmotionsArray(streets){
    const emotionsArray = []    
    for (let street of streets){
        for (let emotion of street.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(streets){
        
    let radioItems = ``
    const emotions = getEmotionsArray(streets)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(streetData)




