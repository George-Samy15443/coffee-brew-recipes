const recipeForm = document.querySelector('#recipe-form')
const recipeContainer = document.querySelector('#recipe-container')
let listItems = []

recipeForm.addEventListener('submit', (e) => { 
    e.preventDefault()
    const name = DOMPurify.sanitize(recipeForm.querySelector('#name').value)
    const method = DOMPurify.sanitize(recipeForm.querySelector('#method').value)
    const roast = DOMPurify.sanitize(recipeForm.querySelector('#roast').value)
    const grind = DOMPurify.sanitize(recipeForm.querySelector('#grind').value)
    const ratio = DOMPurify.sanitize(recipeForm.querySelector('#ratio').value)
    const note = DOMPurify.sanitize(recipeForm.querySelector('#note').value)
    const newRecipe = {
        name,
        method,
        roast,
        grind,
        ratio,
        note,
        id: Date.now
    }

    listItems.push(newRecipe)
    e.target.reset()
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'))
})

recipeContainer.addEventListener('refreshRecipes', () => {
    displayRecipes()
    localStorage.setItem('recipeContainer.list', JSON.stringify(listItems));
})
// recipeContainer.addEventListener('refreshRecipes', saveToLocalStorage)
window.addEventListener('DOMContentLoaded', () => {
    const tempLocalStorage = localStorage.getItem('recipeContainer.list')
    if(!tempLocalStorage) return
    const tempRecipes = JSON.parse(tempLocalStorage)
    listItems.push(...tempRecipes)
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'))
})

function displayRecipes() {
    const tempString = listItems.map(item => `
        <div class="col">
            <div class = "card mb-4 rounded-3 shadow-sm border-primary">
                <div class = "card-header py-3 text-white bg-primary border-primary">
                    <h4 class = "my-0">${item.name}</h4>
                </div>
                <div class = "card-body">
                    <ul class = "text-start">
                        <li><strong>Method: </strong>${item.method}</li>
                        <li><strong>Roast: </strong>${item.roast}</li>
                        <li><strong>Grind: </strong>${item.grind}</li>
                        <li><strong>Ratio: </strong>${item.ratio}</li>
                        ${!item.note.length? "":
                            `<li><strong>Note: </strong>${item.note}</li>`
                        }
                    </ul>
                    <button
                        class = "btn btn-lg btn-outline-danger"
                        value = "${item.id}"
                        aria-label = "delete ${item.name}">
                        Delete
                    </button>
                </div>
            </div>
        </div>
        `).join('')
        recipeContainer.innerHTML = tempString
}

function saveToLocalStorage(){
    localStorage.setItem('recipeContainer.list', JSON.stringify(listItems));
}