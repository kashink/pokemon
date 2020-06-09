const axios = require("axios");

const baseUrl = 'https://pokeapi.co/api/v2/';

async function getPokemonList(page, pageLimit) {
    const response = pokemonList(page, pageLimit);
    // eslint-disable-next-line no-return-await
    return await response;
}
//api https://pokeapi.co/
const pokemonList = (page, pageLimit) => {
    const offset = page * pageLimit - pageLimit
    const limit = pageLimit
    return new Promise(resp => {
        axios({
            method: "get",
            baseURL: `${baseUrl}pokemon/?offset=${offset}&limit=${limit}`,
        })
            .then(function (response) {
                resp(response)
            })
            .catch(function () {
                resp(null)
            });
    });
}

async function getPokemonDetail(url) {
    const response = pokemonDetail(url);
    // eslint-disable-next-line no-return-await
    return await response;
}

const pokemonDetail = (url) => {
    return new Promise(resp => {
        axios({
            method: "get",
            baseURL: url,
        })
            .then(function (response) {
                resp(response)
            })
            .catch(function () {
                resp(null)
            });
    });
}

export {
    getPokemonList,
    getPokemonDetail
};
