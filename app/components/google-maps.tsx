"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

interface Marker {
  lat: number;
  lng: number;
  title: string;
}

interface GoogleMapsProps {
  markers: Marker[];
}

function GoogleMaps({ markers }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  console.log(
    "process.env.NEXT_PUBLIC_JUST_2_TEST",
    process.env.NEXT_PUBLIC_JUST_2_TEST
  );

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "quarterly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      // london
      const location = {
        lat: 51.5074,
        lng: 0.1278,
      };

      const options: google.maps.MapOptions = {
        center: location,
        zoom: 10,
        mapId: "map",
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      };

      const map = new Map(mapRef.current as HTMLElement, options);

      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      markers.forEach((markerData) => {
        new AdvancedMarkerElement({
          position: {
            lat: markerData.lat,
            lng: markerData.lng,
          },
          title: markerData.title,
          map: map,
        });
      });
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ minHeight: "400px" }} />;
}
export default GoogleMaps;
