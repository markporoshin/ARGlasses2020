// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
module.exports = {
    verbose: true,
    transform: {
        '^.+\\.js$': 'babel-jest',
        '\\.css$': 'jest-transform-css',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file'
    },
    setupFiles: ['./jest.setup.js','jest-canvas-mock']
};
