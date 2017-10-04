import React, { Component } from "react";
import { connect } from "react-redux";
import "./root_container.css";

class RootContainer extends Component {
  render () {
    return [
      <header className="holy-grail-header">
        header
      </header>,
      <div className="holy-grail">
        <div className="holy-grail-body">
          <nav className="holy-grail-nav">
            Nav
          </nav>
          <main className="holy-grail-content">
            Content
          </main>
          <aside className="holy-grail-ads">
            Side bar
          </aside>
        </div>
      </div>,
      <footer className="holy-grail-footer">
        footer
      </footer>
    ];
  }
}

RootContainer.propTypes = {};
RootContainer.defaultProps = {};

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
