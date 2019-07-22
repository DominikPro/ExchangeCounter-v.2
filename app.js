const Cash = (props) => {
  const value = (props.cash / props.ratio * props.price).toFixed(2)
  return (
    < div >{ props.title } <br /> { props.cash <= 0 ? "-----" : value } { props.shortName } </div>
  )
}

class ExchangeCounter extends React.Component {

  state = {
    amount: "",
    product: "gas",
  }

  static defaultProps = {
    currencies: [
      {
        id: 0,
        name: 'zloty',
        ratio: 1,
        title: "Warość w złotówkach",
        shortName: "ZŁ"
      },

      {
        id: 1,
        name: 'dolar',
        ratio: 3.6,
        title: "Warość w dolarach",
        shortName: "USA"
      },
      {
        id: 2,
        name: 'euro',
        ratio: 4.1,
        title: "Warość w euro",
        shortName: "EUR"
      },
      {
        id: 3,
        name: 'pound',
        ratio: 4.55,
        title: "Warość w funtach",
        shortName: "GBP"
      },

    ],
    prices: {
      electricity: .51,
      gas: 4.76,
      oranges: 3.79,
    }
  }




  handleChange = (e) => {
    this.setState({
      amount: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState({
      product: e.target.value,
      amount: "",
    })
  }
  insertSuffix = (select) => {
    if (select === "electricity")
      return <em>kWH</em>
    else if (select === "gas")
      return <em>Litrów</em>
    else if (select === "oranges")
      return <em>Kg</em>
    else return null
  }
  selectPrice(select) {
    const price = this.props.prices[select]
    return price
  }

  render() {
    const { amount, product } = this.state;

    const calculators = this.props.currencies.map(curenncy => (
      <Cash
        key={ curenncy.id }
        ratio={ curenncy.ratio }
        title={ curenncy.title }
        cash={ amount }
        shortName={ curenncy.shortName }
        price={ this.selectPrice(product) }
      />
    ))

    return (
      <div className="app">
        <h3>Aplikacja przelicza cen produktów</h3>
        <label>Wybierz produkt:
        <select value={ product } onChange={ this.handleSelect }>
            <option value="electricity">prąd</option>
            <option value="gas">benzyna</option>
            <option value="oranges">pomarańcze</option>
          </select>
        </label>
        <br />
        <br />

        <label>
          <input
            type="number"
            value={ this.state.amount }
            onChange={ this.handleChange }
          />

          { this.insertSuffix(this.state.product) }
        </label>
        <br /><br />

        { calculators }
      </div>
    )

  }
}
ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))
