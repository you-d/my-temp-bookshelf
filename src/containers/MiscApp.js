import React from 'react'

import Header from '../components/header'

export default React.createClass({
  render() {
    return (
        <div className="container desktop-only">
            <Header />
            <section className="bookList">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>{ this.props.params.pageName }</h2>
                        <hr />
                        <p>This is { this.props.params.pageName }</p>
                    </div>
                </div>
            </section>
        </div>
    )
  }
})
