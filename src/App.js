import React, { Component } from 'react'
import Header from './components/Header'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: []
    }
  }
  componentDidMount() {
    const Category = `{categories{
      products{
        gallery
        name
        description
        prices{
          amount
        }
      }
    }}`
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: Category })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ category: response.data.categories.splice(0) })
      })
  }
  render() {
    const { loading, error, category } = this.state
    console.log(category);
    return (
      <div>
        <Header/>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {category.map((categorya) => (
              categorya.products.map((product, pIndex) => (
                <div key={pIndex}>
                  {product.gallery.splice(0, 1).map((imageUrl, gIndex) => (
                    <img key={gIndex} style={{ width: "200px" }} className="image" src={imageUrl} alt="f" />
                  ))}
                  <div>{product.name}</div>
                  <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                  {product.prices.splice(0, 1).map((price, key) => (
                    <div key={key}> {price.amount}</div>
                  ))}
                </div>
              ))

            ))}
          </div>
        )}
      </div>
    )
  }
}

