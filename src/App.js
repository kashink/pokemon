import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetail } from "./api/pokemons"
import Pokemon from "./components/pokemon"
import Pagination from "./components/pagination"
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin: 0 auto;
`

const mostraPokemon = (item, setPokemonlist, setPokemonQuant, pokemonlist) => {
  if (item && item.name && item.url) {
    getPokemonDetail(item.url).then(response => {
      if (response.status === 200) {
        const list = pokemonlist
        if (response.data.sprites.front_default) {
          list.push({ name: response.data.name, image: response.data.sprites.front_default })
          setPokemonlist(list)
          setPokemonQuant(list.length)
        }
      } else {
        console.log("falha")
      }
    });
  }
}

const searchPokemon = (page, setPokemonTotal, setPokemonlist, setPokemonQuant, pokemonlist, pageLimit) => {
  getPokemonList(page, pageLimit).then(response => {
    if (response.status === 200) {
      const pokemonsSemImagem = 100
      setPokemonTotal(response.data.count - pokemonsSemImagem)
      response.data.results.forEach(item => mostraPokemon(item, setPokemonlist, setPokemonQuant, pokemonlist))
    } else {
      console.log("falha")
    }
  });
}

function App() {
  const [pokemonlist, setPokemonlist] = useState([])
  const [pokemonQuant, setPokemonQuant] = useState(0)
  const [pokemonTotal, setPokemonTotal] = useState(0)
  const [page, setPage] = useState(1)
  const pageLimit = 40

  useEffect(() => {
    searchPokemon(page, setPokemonTotal, setPokemonlist, setPokemonQuant, [], pageLimit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const pokemons = pokemonlist.map(pokemon => {
    return (
      <Pokemon key={pokemon.name} {...pokemon}></Pokemon>
    )
  }
  );

  let pages = parseInt(pokemonTotal / pageLimit)

  if (pages * pageLimit !== pokemonTotal) {
    pages += 1
  }

  return (
    <div>
      <Wrapper>
        <Grid>
          {pokemons}
        </Grid>
      </Wrapper>
      <Pagination
        setPage={setPage}
        totalPages={pages}
        page={page}></Pagination>
    </div>
  );
}

export default App;
