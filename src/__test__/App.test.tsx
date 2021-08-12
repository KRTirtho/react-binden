import { shallow } from 'enzyme';
import React from 'react';
import App from '../App';

test('renders learn react link', () => {
    const app = shallow(<App />);
    expect(app.text()).toContain("Form:")
});
