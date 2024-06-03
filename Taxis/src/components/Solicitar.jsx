import React, { useState, useEffect, useRef } from "react";
import Modal from 'react-modal';
import '../../src/estilos/styles.css';
import Encabezado from "./Encabezado";
import Footer from "./Footer";

const Solicitar = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ubicacionActual, setUbicacionActual] = useState("");
    const [ubicacionDestino, setUbicacionDestino] = useState("");
    const [monto, setMonto] = useState("");
    const [mensajeDistancia, setMensajeDistancia] = useState("");
    const [map, setMap] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [markerActual, setMarkerActual] = useState(null);
    const [markerDestino, setMarkerDestino] = useState(null);
    const [placingMarkerType, setPlacingMarkerType] = useState("");
    const mapRef = useRef(null);

    const ubicacionActualRef = useRef(null);
    const ubicacionDestinoRef = useRef(null);

    useEffect(() => {
        if (window.google) {
            const options = {
                types: ['geocode'],
                componentRestrictions: { country: "co" }
            };

            const autocompleteActual = new window.google.maps.places.Autocomplete(ubicacionActualRef.current, options);
            autocompleteActual.setBounds(new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(7.096, -73.125),
                new window.google.maps.LatLng(7.162, -73.062)
            ));
            autocompleteActual.addListener("place_changed", () => {
                const place = autocompleteActual.getPlace();
                setUbicacionActual(place.formatted_address);
                setMarkerLocation(place.geometry.location, "actual");
            });

            const autocompleteDestino = new window.google.maps.places.Autocomplete(ubicacionDestinoRef.current, options);
            autocompleteDestino.setBounds(new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(7.096, -73.125),
                new window.google.maps.LatLng(7.162, -73.062)
            ));
            autocompleteDestino.addListener("place_changed", () => {
                const place = autocompleteDestino.getPlace();
                setUbicacionDestino(place.formatted_address);
                setMarkerLocation(place.geometry.location, "destino");
            });

            const initMap = new window.google.maps.Map(mapRef.current, {
                center: { lat: 7.11392, lng: -73.1198 },
                zoom: 13,
                styles: [
                    { elementType: "geometry", stylers: [{ color: "#d3d3d3" }] },
                    { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
                    { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#494949" }] },
                    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
                    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#494949" }] },
                    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
                    { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#695f8b" }] },
                    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#FF914D" }] },
                    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#494949" }] },
                    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#494949" }] },
                    { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
                    { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                    { featureType: "water", elementType: "geometry", stylers: [{ color: "#3fb0fc" }] },
                    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3fb0fc" }] }
                ]
            });

            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: "#B500EB"
                },
                suppressMarkers: true
            });
            directionsRenderer.setMap(initMap);

            initMap.addListener("click", (event) => {
                if (placingMarkerType) {
                    setMarkerLocation(event.latLng, placingMarkerType);
                    setPlacingMarkerType("");
                }
            });

            setMap(initMap);
            setDirectionsRenderer(directionsRenderer);
        }
    }, [placingMarkerType]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const PedirServicio = () => {
        alert("Servicio solicitado por favor espere al conductor" + "\n" + "Monto: " + monto + "\n" + "Ubicación Actual: " + ubicacionActual + "\n" + "Ubicación Destino: " + ubicacionDestino + "\n" + "Gracias por preferirnos");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (ubicacionActual && ubicacionDestino) {
            calculateDistanceAndRoute(ubicacionActual, ubicacionDestino);
            openModal();
        } else {
            alert("Por favor ingrese la ubicación actual y el destino");
        }
    };

    const calculateDistanceAndRoute = (origin, destination) => {
        if (!window.google) {
            return;
        }
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === 'OK') {
                    const distanceInMeters = response.rows[0].elements[0]?.distance?.value;
                    if (distanceInMeters !== undefined) {
                        const distanceInKilometers = distanceInMeters / 1000;
                        if (distanceInKilometers > 50) {
                            setMensajeDistancia("Mucha distancia");
                            setMonto("");
                        } else {
                            setMensajeDistancia("");
                            const calculatedMonto = 7000 + (distanceInKilometers * 1094);
                            setMonto("$ " + calculatedMonto.toFixed(0));
                            calculateAndDisplayRoute(origin, destination);
                        }
                    } else {
                        alert("No se encuentra una ruta disponible");
                    }
                }
            }
        );
    };

    const calculateAndDisplayRoute = (origin, destination) => {
        if (!map) {
            return;
        }
        const service = new window.google.maps.DirectionsService();
        service.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                } else {
                    alert("No se pudo calcular la ruta: " + status);
                }
            }
        );
    };

    const setMarkerLocation = (location, type) => {
        if (!window.google) {
            return;
        }
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: location }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;
                if (type === "actual") {
                    if (markerActual) {
                        markerActual.setMap(null);
                    }
                    const marker = new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: "Ubicación Actual"
                    });
                    setMarkerActual(marker);
                    setUbicacionActual(address);
                    if (ubicacionActualRef.current) {
                        ubicacionActualRef.current.value = address;
                    }
                } else if (type === "destino") {
                    if (markerDestino) {
                        markerDestino.setMap(null);
                    }
                    const marker = new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: "Ubicación Destino"
                    });
                    setMarkerDestino(marker);
                    setUbicacionDestino(address);
                    if (ubicacionDestinoRef.current) {
                        ubicacionDestinoRef.current.value = address;
                    }
                }
            }
        });
    };

    return (
        <div className="">
            <Encabezado />
            <div className="Solicitar d-flex">
                <div className="SolicitarContenedorPrincipal">
                    <div>
                        <div className="border-bottom SolicitarContenedorTitulo">
                            <p className="SolicitarTitulo">Solicitar</p>
                            <p className="SolicitarInfo">Ingresa tu destino y tu llegada con éxito</p>
                        </div>
                        <div className="m-2">
                            <form onSubmit={handleSubmit} className="formSolicitud">
                                <div className="d-flex solicitarImagenEncuesta">
                                    <div className="SolicitarImagenPequeñaContenedor">
                                        <img
                                            src="./src/assets/ImagenUbicacion.png"
                                            alt=""
                                            className="SolicitarImagenPequeña"
                                            onClick={() => setPlacingMarkerType("actual")}
                                        />
                                    </div>
                                    <div className="SolicitarInputContenedor">
                                        <label htmlFor="UbicacionActual" className="text-black">Ubicación Actual</label>
                                        <input
                                            type="text"
                                            className="form-control Input"
                                            placeholder="Ingresa tu ubicación"
                                            id="UbicacionActual"
                                            ref={ubicacionActualRef}
                                            value={ubicacionActual}
                                            onChange={(e) => setUbicacionActual(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex solicitarImagenEncuesta border-bottom">
                                    <div className="SolicitarImagenPequeñaContenedor">
                                        <img
                                            src="./src/assets/ImagenUbicacion.png"
                                            alt=""
                                            className="SolicitarImagenPequeña"
                                            onClick={() => setPlacingMarkerType("destino")}
                                        />
                                    </div>
                                    <div className="SolicitarInputContenedor">
                                        <label htmlFor="UbicacionDestino" className="text-black">Ubicación Destino</label>
                                        <input
                                            type="text"
                                            className="form-control Input"
                                            placeholder="Ingresa tu destino"
                                            id="UbicacionDestino"
                                            ref={ubicacionDestinoRef}
                                            value={ubicacionDestino}
                                            onChange={(e) => setUbicacionDestino(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {mensajeDistancia && <div className="alert alert-warning text-center text-white bg-black" role="alert">{mensajeDistancia}</div>}
                                    <div className="w-100 SolicitarContenedorBoton m-2">
                                        <button type="submit" className="SolicitarBotonConfirmar mt-5">Solicitar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="SolicitarContenedorMapa">
                    <div ref={mapRef} style={{ width: "100%", height: "500px", borderRadius: "8px" }}></div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="SolicitarFondoPantalla"
                className="SolicitarContenedorPantalla"
                contentLabel="Documento HTML"
            >
                {/* <div className="d-flex"> */}
                {/* <div className="w-50"> */}
                <h2 className="tituloPaginas">Confirmar Viaje</h2>
                <div w-100>
                    <div className="d-flex solicitarImagenEncuesta m-3">
                        <div className="SolicitarImagenPequeñaContenedor">
                            <img src="./src/assets/ImagenSignoPesos.png" alt="" className="SolicitarImagenPequeñaMonto" />
                        </div>
                        <div className="SolicitarInputContenedor">
                            <label htmlFor="Monto" className="text-black">Monto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Monto"
                                id="Monto"
                                value={monto}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="BotonGeneral" onClick={() => {closeModal(); PedirServicio();}}>Pedir Servicio</button>
                    </div>
                </div>
                <button onClick={closeModal} className="BotonGeneral">Cerrar</button>
            </Modal>
            <Footer />
        </div>
    );
}

export default Solicitar;
