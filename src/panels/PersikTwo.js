import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';

const PersikTwo = props => (
	<Panel id={props.id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			Persikkkkkkkk
		</PanelHeader>
		<img className="Persik" src={persik} alt="Persik The Cat"/>
		<img className="Persik" src={persik} alt="Persik The Cat"/>
	</Panel>
);

PersikTwo.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default PersikTwo;
