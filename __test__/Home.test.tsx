import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { describe, it } from 'node:test'

describe('Home Page', () => {
    it('should load the home page', async () => {
        render(<Home />)
        const myElem = await screen.getByText('Home')
        expect(myElem).toBeInTheDocument() // Assert
    })

    it('should have a specific sentence', async () => {
        render(<Home />)
        const myElem = await screen.getAllByText('This is for testing')
        expect(myElem).toBeInTheDocument() // Assert
    })
    // it('should have a specific sentence', async () => {
    //     render(<Home />)
    //     const elements = await screen.findAllByRole('heading', { name: /This is for testing/i })
    //     expect(elements.length).toBe(1)
    //     expect(elements[0]).toBeInTheDocument()
    // })
})


