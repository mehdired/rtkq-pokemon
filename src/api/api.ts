import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type PokemonListType = {
	name: string
	url: string
}

type PokemonType = {
	name: string
	id: number
	sprites: {
		other: {
			'official-artwork': {
				front_default: string
			}
		}
	}
}

export const pokeApi = createApi({
	reducerPath: 'pokeApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
	endpoints: (builder) => ({
		getPokemons: builder.query<PokemonListType[], void>({
			query: () => 'pokemon',
			transformResponse: (response: { results: PokemonListType[] }) =>
				response.results
		}),
		getPokemon: builder.query<PokemonType, string>({
			query: (name) => `pokemon/${name}`
		})
	})
})

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokeApi
