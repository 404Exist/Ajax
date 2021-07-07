const apiUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];
let searchInput = document.getElementById('search');
let suggestions = document.querySelector('.suggestions');
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let asyncronus = async () => {
    await fetch(apiUrl)
            .then(data =>  data.json())
            .then(data => cities.push(...data));
    function findMatches(wordToMatch, cities){
        return cities.filter(place => {
            let regex = new RegExp(wordToMatch, 'gi'); //gi which mean global and insative
            return place.city.match(regex) || place.state.match(regex);
        });
    }
    function displayMatchesUi() {
        if (this.value != '') {
            let matchArray = findMatches(this.value, cities);
            if(matchArray.length > 0) {
                let DOM = matchArray.map(place => {
                    let regex = new RegExp(this.value, 'gi');
                    let coloredCityName = place.city.replace(regex, `<mark>${this.value}</mark>`);
                    let coloredStateName = place.state.replace(regex, `<mark>${this.value}</mark>`);
                    return `
                        <li>
                            <span>${coloredCityName}, ${coloredStateName}</span>
                            <span class="population">${numberWithCommas(place.population)}</span>
                        </li>
                    `;
                });
                suggestions.innerHTML = DOM.join('');
            } else {
                suggestions.innerHTML = `
                    <li>There's no match results !!!</li>
                    <li>Please check what you wrote ...</li>
                `;
            }
        } else {
            suggestions.innerHTML = `
                <li>Filter For A City</li>
                <li>Or A State</li>
            `;
        }
    }
    searchInput.addEventListener('keyup', displayMatchesUi);
} 
asyncronus();


