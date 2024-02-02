import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Episode from "../Episode"

const exampleEpisodeData = {
  // ... (existing episode data)
}

describe('Episode component', () => {
  test("renders without error", () => {
    render(<Episode episode={exampleEpisodeData} />)
    screen.debug() // This will print the simulated DOM
  })

  test("renders texts and alt texts correctly", () => {
    const { rerender } = render(<Episode episode={exampleEpisodeData} />)

    // Check that the summary renders to the DOM
    expect(screen.getByText(exampleEpisodeData.summary)).toBeInTheDocument()

    // Check that the alt text "episode image" is present
    expect(screen.getByAltText('episode image')).toBeInTheDocument()

    // Rerender the component passing episode data lacking an image
    const episodeDataWithoutImage = { ...exampleEpisodeData, image: null }
    rerender(<Episode episode={episodeDataWithoutImage} />)

    // Check that the default image appears in the DOM
    const defaultImageSrc = 'path/to/default/image.jpg' // Replace with actual path to default image
    expect(document.querySelector(`img[src="${defaultImageSrc}"]`)).toBeInTheDocument()

    // Check that the "generic episode image" alt text is present
    expect(screen.getByAltText('generic episode image')).toBeInTheDocument()

    // Rerender the component passing an undefined episode
    rerender(<Episode episode={undefined} />)

    // Check that the "Loading episode..." text is present
    expect(screen.getByText('Loading episode...')).toBeInTheDocument()
  })
})
