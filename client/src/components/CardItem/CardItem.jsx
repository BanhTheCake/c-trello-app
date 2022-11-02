import React from 'react';
import './CardItem.scss';

const CardItem = ({ card }) => {
    return (
        <div className="card-item">
            {card?.cover && (
                <div className="card-item__img">
                    <img
                        src="https://images.unsplash.com/photo-1666607644665-6762ba4089a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                        alt=""
                        onMouseDown={e => e.preventDefault()}
                    />
                </div>
            )}
            <p className="card-item__title">{card?.title}</p>
        </div>
    );
};

export default CardItem;
