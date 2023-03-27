import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {Avatar, Panel, PanelHeader, PanelHeaderBack, ScreenSpinner} from '@vkontakte/vkui';

import './Persik.css';

const Clicker = props => {
    const [count, setCount] = useState(0);

    const increment = (i) => {
        setCount(count + 1 );
        props.deleteF(i);
    }

    return (
        <Panel id={props.id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Clicker Накликано {count} друзей
            </PanelHeader>
            <div className="clicker">
                {props.friends.map((friend, i ) =>
                    <Avatar
                         className='clicker__element'
                    //     style={{
                    //         top:Math.random()*window.innerWidth,
                    //         bottom:Math.random()*window.innerWidth,
                    //         left:Math.random()*window.innerWidth,
                    //         right:Math.random()*window.innerWidth
                    // }}

                        size={100}
                        src={friend.photo_100}
                        key={friend.id}
                        onClick={()=>increment(i)} />
                )}
            </div>
        </Panel>
    );
}

Clicker.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default Clicker;
