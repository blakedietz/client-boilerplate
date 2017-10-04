/**
 * RootDankKombucha: This component is responsible for coordinating all components and containers for the
 * RootDankKombucha application.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './root_container.css';

// #boilerplate Import your application components here

class RootContainer extends Component {
    render() {
        return [
          <header>
            <h1>Holy Grail layout made easy with flexbox</h1>
          </header>,
          <div className="layout__body">
            <main className="layout__content">...</main>
            <nav className="layout__nav layout__columns">...</nav>
            <aside className="layout__aside layout__columns">...</aside>
          </div>,
          <footer>
            <a href="https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/">Adapted from this awesome site</a>
          </footer>
          ];
    }
}

RootContainer.propTypes = {};
RootContainer.defaultProps = {};

const mapStateToProps = (state) => ({
        state,
    });

const mapDispatchToProps = (dispatch) => ({
        dispatch,
    });
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
