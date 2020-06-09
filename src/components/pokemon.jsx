/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
    display: inline-block;
    text-align: center;
    width: 100px;
    height: 136px;
    margin: 5px;
`

const Nome = styled.span`

`

const Imagem = styled.img`
    display: block;
    margin: 0 auto;
    width: 100%;
`

const Pokemon = ({name, image}) => {
	return (
		<Item>
            <Imagem src={image} />
            <Nome>{name}</Nome>
        </Item>
	)
}

export default Pokemon
