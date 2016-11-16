import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ProgressDialog from './ProgressDialog.jsx';

describe('App', () => {
    it('renders', () => {
        const el = TestUtils.renderIntoDocument(<ProgressDialog />);
        expect(el).toBeDefined();
    });
});