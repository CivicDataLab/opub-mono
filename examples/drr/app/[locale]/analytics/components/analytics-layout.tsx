'use client'
import React from "react";
import { MapComponent } from "./map-component";

export function Content({
    timePeriod,
    indicator,
  }: {
    timePeriod: string;
    indicator: string;
  }) {
    return (
      <React.Fragment>
        <p>{indicator}-{timePeriod}</p>
        <MapComponent />
      </React.Fragment>
    )

  }