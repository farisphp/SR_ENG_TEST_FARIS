import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import SignerIndex from './Index';
import { BrowserRouter, Switch, Route} from 'react-router-dom'; 

afterEach(cleanup)

describe('Props test', () => {
  test('Should display Penandatanganan SPT', () => {
    render(
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={SignerIndex} />
            </Switch>
        </BrowserRouter>
    );
    const elements = screen.getAllByText("Penandatangan SPT");

    elements.forEach((element) => {
        expect(element.textContent).toBe("Penandatangan SPT");
    });
  })
})

describe('Snapshot test', () => {
    test('Renders correctly.', () => {
        render(
            <BrowserRouter>
                <Switch>
                    <Route path={'/'} exact component={SignerIndex} />
                </Switch>
            </BrowserRouter>
        );
        const elements = screen.getAllByText("Penandatangan SPT");
    
        expect(elements).toMatchSnapshot()
    })
})