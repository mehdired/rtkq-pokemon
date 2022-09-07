import { useGetPokemonQuery, useGetPokemonsQuery } from './api/api'

import { styled } from '@stitches/react'

type PropPokemon = {
	name: string
}

const StyledPokemonItem = styled('div', {
	width: '24%',

	img: {
		width: '100%'
	},

	p: {
		textAlign: 'center'
	}
})

const PokemonItem = ({ name }: PropPokemon) => {
	const { data } = useGetPokemonQuery(name, { skip: !name })

	return (
		<StyledPokemonItem>
			<img
				src={data?.sprites.other['official-artwork'].front_default}
				alt=""
			/>
			<p>{data?.name}</p>
		</StyledPokemonItem>
	)
}

const StyledPokemonList = styled('ul', {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '20px 10px'
})

function App() {
	const { data, isLoading } = useGetPokemonsQuery()

	if (isLoading) return <div>...Loading</div>

	return (
		<StyledPokemonList>
			{data?.map((pokemon) => (
				<PokemonItem key={pokemon.name} name={pokemon.name} />
			))}
		</StyledPokemonList>
	)
}

export default App
