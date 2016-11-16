import './app.less';
import 'bootstrap-css-only';

import React from 'react';
import ReactDOM from 'react-dom';

import ProgressDialog from './components/ProgressDialog.jsx';

ReactDOM.render(<ProgressDialog />,
    document.getElementById('root')
);