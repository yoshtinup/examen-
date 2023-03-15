
import * as React from 'react';
import { Container } from '@mui/material';
import NavMenu from './NavMenu';

// Componente que envuelve a cada componente principal
export default class Layout extends React.PureComponent<any, { children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
                <NavMenu />
                <Container maxWidth="xl">
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}
