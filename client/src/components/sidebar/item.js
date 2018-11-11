import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './item.scss';

class Item extends Component {
    render() {
        /** Recive item object to view in list */
        let { title, id } = this.props.item;
        return (
            <div className='item'>
                <Link className="title" to={`/items/${id}`}>
                    <h3>{title}</h3>
                </Link>
            </div>
        )
    }
}

export default Item;