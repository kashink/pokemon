import React from 'react'

import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

const Button = styled.button`
	width: 40px;
	height: 40px;
	font-size: 18px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: 1.33;
	letter-spacing: normal;
	text-align: center;
	color: ${props => (props.active ? '#009fde' : '#666666')};
	align-items: center;
	display: flex;
	justify-content: center;
	border-radius: 3px;
	border: solid 1px ${props => (props.active ? '#009fde' : '#e2e2e2')};
	background-color: #ffffff;
	margin: 0 2px;

	:disabled {
		opacity: 0.4;
	}
	outline: none;
`

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	grid-column: ${({ gridColumn }) => gridColumn};
`

const PaginationNumbers = ({
	totalPages,
	current,
	changePage,
	startIn,
	mode,
	setStartIn,
	arrow,
	setArrow,
	lastPage,
	setLastPage
}) => {
	let maxButtons = 6 //padrão
	if (mode === 'mobile') maxButtons = 4

	// caso o total de páginas seja menor que 6 ou 4
	maxButtons = totalPages > maxButtons ? maxButtons : totalPages

	const [buttonsArray, setButtonsArray] = React.useState([])

	// TODO: Isso deveria ser um state?
	let ellipsisGoToPage = current + (maxButtons - 2)

	// Roda sempre que o startIn muda, ou seja,
	// Quando o botão de voltar á esquerda é clicado
	React.useEffect(() => {
		let buttons = buttonsArray.slice().map(b => ({
			...b,
			active: b.text === current
		}))

		setButtonsArray(buttons)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current])

	React.useEffect(() => {
		if (lastPage && current === totalPages && startIn !== totalPages - maxButtons + 1) {
			setLastPage(false)
			setStartIn(totalPages - maxButtons + 1)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastPage])

	React.useEffect(() => {
		let maxRight = maxButtons + startIn
		if (maxRight <= totalPages) maxRight -= 2
		if (maxRight > totalPages) maxRight = totalPages + 1

		switch (arrow) {
			case 'left': {
				if (current === startIn) {
					setStartIn(startIn - 1)
				}
				changePage(current - 1)
				break
			}
			case 'right': {
				if (current === maxRight - 1) {
					setStartIn(startIn + 1)
				}
				changePage(current + 1)
				break
			}
			default: {
				break
			}
		}

		setArrow('')

		let buttons = []
		for (let i = startIn; i < maxRight; i++) {
			buttons.push({
				text: i,
				active: current === i,
				onClick: () => changePage(i)
			})
		}

		if (maxRight < totalPages) {
			buttons.push({
				text: '...',
				active: false,
				onClick: () => ellipsis()
			})

			buttons.push({
				text: totalPages,
				active: current === totalPages,
				onClick: () => changePage(totalPages) // ou ellipsisAfter
			})
		}

		setButtonsArray(buttons)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startIn, arrow, totalPages])

	const ellipsis = () => {
		var initial = 1
		if (ellipsisGoToPage + maxButtons - 1 > totalPages) {
			if (totalPages - maxButtons + 1 > 1) {
				initial = totalPages - maxButtons + 1
			}
		} else {
			initial = ellipsisGoToPage
		}
		setStartIn(initial)
		changePage(ellipsisGoToPage)
	}

	return (
		<>
			{buttonsArray.map((buttonInfo, i) => (
				<Button key={i} active={buttonInfo.active} onClick={buttonInfo.onClick}>
					{buttonInfo.text}
				</Button>
			))}
		</>
	)
}

export default function Pagination({
	setPage,
	totalPages,
	mode,
	page = 1,
	gridColumn
}) {
	const [startIn, setStartIn] = React.useState(1)
	const [arrow, setArrow] = React.useState('')
	const [lastPage, setLastPage] = React.useState(false)
	const [startPage, setStartPage] = React.useState(page)

	if (startPage !== page && page === 1) {
		setStartPage(1)
		setStartIn(1)
	}

	const [recalculate, toggleRecalculate] = React.useState(false)

	const handleChangePage = newPage => {
		setStartPage(newPage)
		if (newPage === totalPages) setLastPage(true)

		setPage(newPage)
	}
	const handleGoFirst = () => {
		setArrow('left')
	}
	const handleGoLast = () => {
		setArrow('right')
	}

	return (
		<>
			<ButtonsWrapper gridColumn={gridColumn}>
				<Button onClick={handleGoFirst} disabled={startPage === 1}>
					<MdKeyboardArrowLeft />
				</Button>
				<PaginationNumbers
					totalPages={totalPages}
					current={startPage}
					changePage={handleChangePage}
					recalculate={recalculate}
					toggleRecalculate={toggleRecalculate}
					startIn={startIn}
					mode={mode}
					setStartIn={setStartIn}
					arrow={arrow}
					setArrow={setArrow}
					lastPage={lastPage}
					setLastPage={setLastPage}
				/>
				<Button onClick={handleGoLast} disabled={startPage === totalPages}>
					<MdKeyboardArrowRight />
				</Button>
			</ButtonsWrapper>
		</>
	)
}
