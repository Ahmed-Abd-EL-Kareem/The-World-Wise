import React from "react";
import Spinner from "./Spinner"; // Assuming you have a Spinner component
import Massage from "./Message"; // Assuming you have a Massage component
import styles from "./CountryList.module.css"; // Assuming you have a CSS module for styles
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

export default function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return (
      <Massage message="Add your first city by clicking on a point on the map" />
    );

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country))
      return [...acc, { country: city.country, emoji: city.emoji }];
    else {
      return acc;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
