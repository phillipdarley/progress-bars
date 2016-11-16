import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ProgressBar from './ProgressBar.jsx';
import {
    shallow,
    mount,
    render
} from 'enzyme';

describe('<ProgressBar />', () => {


    it('expect calculatePercentage text to be correct', () => {

        let value = 25;
        let limit = 50;

        let wrapper = shallow(<ProgressBar value={
            value
        }
            limit={
                limit
            }
            />);

        let precentageText = wrapper.find('span').text()

        console.log(precentageText);
        expect(precentageText).toEqual(' 50% ');
    });

});