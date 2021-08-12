require('@testing-library/jest-dom');
const { configure } = require('enzyme');
const Adapter17 = require('@wojtekmaj/enzyme-adapter-react-17');

configure({ adapter: new Adapter17() });
