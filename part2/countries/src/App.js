import { useState, useEffect } from 'react'
import countryService from './service/country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries <input onChange={handleSearchChange}/>
      <Filter countries={countries} search={search}/>
    </div>
  )
}

const Filter = ({search, countries}) => {
  if (search == "") {
    return ""
  }

  const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))

  if (filtered.length == 1) {
    return (
      filtered.map((country) => <CountryDetails key={country.name.official} country={country}/>)
    )
  }
  else if (filtered.length <= 10) {
    return (
      filtered.map((country) => <Country key={country.name.official} country={country} />)
    )
  }
  else {
    return (<div>Too many matches, specify another filter</div>)
  }

}

const Country = ({country}) => <div>{country.name.common}</div>


const CountryDetails = ({country}) => {
  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          <Languages country={country}/>
        </ul>
        <Flag country={country}/>
      </div>
  )
}

const Languages = ({country}) => {
  const langs = Object.values(country.languages)

  return (
    langs.map((lang) => <li key={lang}>{lang}</li>)
  )
}

const Flag = ({country}) => {
  return (
    <img src={country.flags.png}/>
  )
}

export default App;