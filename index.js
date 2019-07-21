'use strict';
function submitHandeler() {
    $('#js-form').submit(event => {
        event.preventDefault();
        $('.js-results').empty().addClass('hidden')
        const username = $('.js-username').val();
        $('.js-username').val('');
        getRepos(username);
    });
}

function getRepos(username) {

    const url = `https://api.github.com/users/${username}/repos`

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            displayError(err.message);
        });
}

function displayError(error) {
    $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.js-results').removeClass('hidden')
}

function displayResults(responseJson) {

    let user = responseJson[0].owner.login

        $('.js-results').append(`
        <h4>User: <span class="user">${user}</span></h4>
        <h4><span class="user">Repos: ${responseJson.length}</span></h4>
        <ul class="results-list"></ul>
    `)

    for (let i = 0; i < responseJson.length; i++) {
        $('.js-results').append(`
        <div class="result-item"><li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        <p>${responseJson[i].description}</p>
        </li></div>
        `)
    }
    $('.js-results').removeClass('hidden')

}


$(submitHandeler());