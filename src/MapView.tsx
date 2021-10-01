import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidGFrdXRvc3V6dWtpbWFwYm94IiwiYSI6ImNrdTdxaW43YTN4c3gzMHA4ZTh4ejVpMGEifQ.1vgyiNp3p0hVGbrn6WHulQ';

const mapStyle = 'mapbox://styles/takutosuzukimapbox/ckr0l9cln5b5e18n0x970lxnt'
const mapContainerStyle = { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, }

export const MapView = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef(null);
    useEffect(() => {
        if (map.current) {
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [139.6503, 35.6762],
            zoom: 14,
        });

        let _map = map.current

        _map.on('load', () => {
            _map.addSource('dosha', {
                type: 'vector',
                url: 'mapbox://takutosuzukimapbox.dosha2'
            });
            _map.addLayer({
                'id': 'dosha',
                'type': 'fill',
                'source': 'dosha',
                'source-layer': 'dosha',
                'paint': {
                    'fill-color': [
                        "match",
                        ["get", "A33_002"],
                        ["1"],
                        "hsl(45, 96%, 56%)",
                        ["2"],
                        "hsl(0, 95%, 53%)",
                        "hsl(0, 0%, 100%)"
                    ]
                }
            });
        })
    }, []);

    return <div style={mapContainerStyle} ref={mapContainer} />;
};


