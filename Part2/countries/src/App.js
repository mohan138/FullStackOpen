import { useState, useEffect } from "react";
import Note from "./components/Note";
import countryServices from "./Services/countryServices";

const Display = ({ countries, errorStatus }) => {
  if (errorStatus || countries.length === 0) {
    return (
      <div>
        <p>No country with that name</p>
      </div>
    )
  }

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map(country => <Note key={countries.indexOf(country)} text={country.name.common} />)}
        </ul>
      </div>
    )
  }
  else if (countries.length === 1) {
    const country = countries[0];
    const languages = Object.values(country.languages);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}<br />area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {languages.map(language => <Note key={languages.indexOf(language)} text={language} />)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    )
  }
  else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

const Search = ({ setCountries, setErrorStatus }) => {
  const [country, setCountry] = useState("");

  const handelChange = (event) => {
    setCountry(event.target.value);
    if (event.target.value.length > 0) {
      const url = `https://restcountries.com/v3.1/name/${event.target.value}`;
      countryServices.get(url).then(response => {
        setCountries(response.map((country) => (country)));
        setErrorStatus(false);
      }).catch(error => {
        setErrorStatus(true);
      })
    }
    else {
      const url = `https://restcountries.com/v3.1/all`;
      countryServices.get(url).then(response => {
        setCountries(response.map((country) => (country)));
      })
    }
  }

  return (
    <div>
      <label htmlFor="search">find countries </label>
      <input id="search" value={country} onChange={handelChange}></input>
    </div>
  )
}

const Body = ({ setCountries, countries, errorStatus, setErrorStatus }) => {
  return (
    <div>
      <Search setCountries={setCountries} setErrorStatus={setErrorStatus} />
      <Display countries={countries} errorStatus={errorStatus} />
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([]);
  const [errorStatus, SetErrorStatus] = useState(false);

  useEffect(() => {
    countryServices.get("https://restcountries.com/v3.1/all").then(response => {
      setCountries(response.map((country) => country));
    })
  }, []);
  return (
    <Body setCountries={setCountries} countries={countries} errorStatus={errorStatus} setErrorStatus={SetErrorStatus} />
  );
}

export default App;
