import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap, Popup, ZoomControl } from "react-leaflet";
import { connect } from "react-redux";
import { setPlacePreviewVisibility, setSelectedPlace } from "../../store/actions";
import { IState, Place } from "../../store/models";
import AddMarker from "./AddMarker";
import { mapboxAPI } from "../../Constants"
import icon from "../../Constants";
import L from "leaflet";

import "./Map.css";

const Map = ({
  isVisible,
  places,
  selectedPlace,
  togglePreview,
  setPlaceForPreview,
}: any) => {
  const defaultPosition: LatLngExpression = [30.2672, -97.7431]; // Austin position
  const [polyLineProps, setPolyLineProps] = useState([]);

  useEffect(() => {
    setPolyLineProps(places.reduce((prev: LatLngExpression[], curr: Place) => {
      prev.push(curr.position);
      return prev;
    }, []))
  }, [places]);

  function LocationMarker() {
    const [position, setPosition] = useState(defaultPosition);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // const radius = e.accuracy;
        // const circle = L.circle(e.latlng, radius);
        // circle.addTo(map);
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
    );
  }

  const showPreview = (place: Place) => {
    if (isVisible) {
      togglePreview(false);
      setPlaceForPreview(null);
    }

    if (selectedPlace?.location !== place.location) {
      setTimeout(() => {
        showPlace(place);
      }, 400);
    }
  };

  const showPlace = (place: Place) => {
    setPlaceForPreview(place);
    togglePreview(true);
  };

  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={20}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
        zoomControl={false}
      >
        <TileLayer
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={20}
          id='mapbox/streets-v11'
          tileSize={512}
          zoomOffset={-1}
          accessToken={mapboxAPI}
        />
        <Polyline positions={polyLineProps} />
        {places.map((place: Place) => (
          <Marker
            key={place.location}
            position={place.position}
            eventHandlers={{ click: () => showPreview(place) }}
          >
            <Tooltip>{place.location}</Tooltip>
          </Marker>
        ))}
        <AddMarker />
        <ZoomControl position="topleft" zoomInText="+" zoomOutText="-" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { places } = state;
  return {
    isVisible: places.placePreviewsIsVisible,
    places: places.places,
    selectedPlace: places.selectedPlace,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePreview: (payload: boolean) =>
      dispatch(setPlacePreviewVisibility(payload)),
    setPlaceForPreview: (payload: Place) =>
      dispatch(setSelectedPlace(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
