// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

window.URL.createObjectURL = function () { };

export const mockMapAddLayer = jest.fn();
export const mockMapAddSource = jest.fn();
export const mockMapOn = jest.fn();

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: function () {
        return {
            addSource: mockMapAddSource,
            addLayer: mockMapAddLayer,
            on: (event: string, fn: Function) => {
                mockMapOn(event, fn)
                fn() // pass thru original
            },
        }
    }
}));
