const STATE_COMPLETED = 4;
const STATUS_OK = 200;

function saveRecipe(id) {
    const form = document.querySelector('form');
    const formData = new FormData(form);

    const request = new XMLHttpRequest();
    
    request.onreadystatechange = () => {
        if (request.readyState == STATE_COMPLETED) {
            if (request.status == STATUS_OK) {
                console.log(`Successfully saved the recipe (id: ${id})`);
                window.location.href = "/recipes";
            }
            else {
                alert(`Could not edit recipe. Status code ${request.status}.`);
            }
        }
    };
    request.open('PUT', `/recipes/${id}`);
    request.send(formData);
}