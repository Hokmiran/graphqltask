import React, { Component } from 'react'


export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsCategory: []
    }
  }
  componentDidMount() {
    const Category = ` {categories {
      name
      }}`
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: Category })
    }).then(response => response.json())
      .then(response => { this.setState({ productsCategory: response.data.categories }) })
  }
  render() {

    const { productsCategory } = this.state
    return (
      <div>
        {productsCategory.map((categoryName, key) => (

          <div key={key}>
            {categoryName.name}
          </div>

        ))}
      </div>
    )
  }
}