import React from "react";
import Spinner from "./Spinner"; // Assuming you have a Spinner component
import styles from "./CityList.module.css"; // Assuming you have a CSS module for styles
import CityItem from "./CityItem";
import Massage from "./Message"; // Assuming you have a Massage component
import { useCities } from "../contexts/CitiesContext";
export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return (
      <Massage message="Add your first city by clicking on a point on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
