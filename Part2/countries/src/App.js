import { useState, useEffect } from "react";
import Note from "./components/Note";
import countryServices from "./Services/countryServices";
import weatherService from "./Services/weatherService";




const Weather = ({ country }) => {
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${country[0].capital}&appid=${process.env.REACT_APP_API_KEY}`;
  useEffect(() => {
    weatherService.getCoordinates(url).then(response => {
      weatherService.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
        setTemp(response.main.temp);
        setWind(response.wind.speed);
        setIcon(response.weather[0].icon);
      })
    });
  }, []);

  return (
    <div>
      <h2>Weather in {country[0].capital}</h2>
      <p>temperature {(temp - 273.15).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
      <p>wind {wind} m/s</p>
    </div>
  )
}


const showDetails = (index, setCountries, countries) => {
  const holder = countries[index];
  countryServices.get(`https://restcountries.com/v3.1/name/${holder.name.common}`).then(response => {
    setCountries(response);
  })
}

const goBack = (setCountries) => {
  const url = `https://restcountries.com/v3.1/all`;
  countryServices.get(url).then(response => {
    setCountries(response.map(countries => countries));
  })
}

const Display = ({ countries, errorStatus, setCountries }) => {
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
          {countries.map(country => <Note key={countries.indexOf(country)} text={country.name.common} showDetails={() => showDetails(countries.indexOf(country), setCountries, countries)} />)}
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
          {languages.map(language => <li key={languages.indexOf(language)}>{language}</li>)}
        </ul>
        <img style={{ display: "block" }} src={country.flags.png} alt={country.flags.alt} />
        <button onClick={() => goBack(setCountries)}>back</button>
        <Weather country={countries} />
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

const Search = ({ setCountries, setErrorStatus, setInputStatus }) => {
  const [country, setCountry] = useState("");

  const handelChange = (event) => {
    setCountry(event.target.value);
    if (event.target.value.length > 0) {
      const url = `https://restcountries.com/v3.1/name/${event.target.value}`;
      countryServices.get(url).then(response => {
        setCountries(response.map((country) => (country)));
        setInputStatus(true);
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
      setInputStatus(false);
    }
  }

  return (
    <div>
      <label htmlFor="search">find countries </label>
      <input id="search" value={country} onChange={handelChange}></input>
    </div>
  )
}

const Body = ({ setCountries, countries, errorStatus, setErrorStatus, inputStatus, setInputStatus }) => {
  return (
    <div>
      <Search setCountries={setCountries} setErrorStatus={setErrorStatus} setInputStatus={setInputStatus} />
      <Display countries={countries} errorStatus={errorStatus} inputStatus={inputStatus} setCountries={setCountries} />
    </div>
  )
}

function App() {
  const api_key = process.env.REACT_APP_API_KEY;
  const [countries, setCountries] = useState([]);
  const [errorStatus, SetErrorStatus] = useState(false);
  const [inputStatus, setInputStatus] = useState(false)

  useEffect(() => {
    countryServices.get("https://restcountries.com/v3.1/all").then(response => {
      setCountries(response.map((country) => country));
    })
  }, []);
  return (
    <Body setCountries={setCountries} countries={countries} errorStatus={errorStatus} setErrorStatus={SetErrorStatus} inputStatus={inputStatus} setInputStatus={setInputStatus} />
  );
}

export default App;
