import React from 'react';
import { render, } from '@testing-library/react';
import { MapView } from './MapView';
import { mockMapAddSource, mockMapAddLayer, mockMapOn } from './setupTests'
import module from 'mapbox-gl/dist/mapbox-gl'

describe('MapView', () => {
    afterEach(() => {
        mockMapAddSource.mockRestore()
        mockMapAddLayer.mockRestore()
        mockMapOn.mockRestore()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('renders MapView without crashing', () => {
        render(<MapView />);
    })

    test('and adds necessary layers', () => {
        const mapFn = jest.spyOn(module, 'Map')
        render(<MapView />);
        expect(mapFn).toHaveBeenCalledWith(
            expect.objectContaining({
                center: [139.6503, 35.6762],
                style: 'mapbox://styles/takutosuzukimapbox/ckr0l9cln5b5e18n0x970lxnt',
                zoom: 14,
            }))
        expect(mockMapOn).toHaveBeenCalledWith('load', expect.any(Function))
        expect(mockMapAddSource).toHaveBeenCalledWith('dosha',
            expect.objectContaining({
                type: 'vector',
                url: 'mapbox://takutosuzukimapbox.dosha2'
            }))
        expect(mockMapAddLayer).toHaveBeenCalledWith({
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
        })
        expect(module.accessToken).toEqual(
            'pk.eyJ1IjoidGFrdXRvc3V6dWtpbWFwYm94IiwiYSI6ImNrdTdxaW43YTN4c3gzMHA4ZTh4ejVpMGEifQ.1vgyiNp3p0hVGbrn6WHulQ'
        )
    });
})
