import CardItem from '../CardItem/CardItem';
import React, { memo, useCallback, useMemo } from 'react';
import './CardList.scss';
import _ from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import { useDispatch } from 'react-redux';
import { setEachColumn } from '../../app/boardSlice';
import applyDrag from '../../utils/applyDrag';
import { useMutation } from 'react-query';
import { columns as columnsApi } from '../../api/columns';

const CardList = ({ column, children }) => {
    const { mutate: onUpdateColumn } = useMutation(columnsApi.updateColumn, {
        onError: (err) => {
            console.log(err);
            dispatch(setEachColumn(column));
        },
    });

    const dispatch = useDispatch();

    const cards = useMemo(() => {
        const selectCards = [...column?.cards];
        const CardsOrder = [...column?.cardOrder];

        if (!selectCards || !CardsOrder) return;

        const sortedCards = _.sortBy(selectCards, (card) => {
            return CardsOrder.indexOf(card._id);
        });

        return sortedCards;
    }, [column.cards, column.cardOrder]);

    const onGetChild = (index) => {
        return cards[index];
    };

    const handleCardDrop = useCallback(
        (payloadData) => {
            const { removedIndex, addedIndex, payload } = payloadData;
            if (
                (removedIndex === null && addedIndex === null) ||
                removedIndex === addedIndex
            )
                return;

            let currentColumn = _.cloneDeep(column);

            const sortedCards = _.sortBy(currentColumn.cards, (card) => {
                return currentColumn.cardOrder.indexOf(card._id);
            });

            const newCards = applyDrag(sortedCards, payloadData);
            const newCardOrder = newCards.map((card) => card._id);

            currentColumn = {
                ...currentColumn,
                cardOrder: newCardOrder,
                cards: newCards,
            };

            dispatch(setEachColumn(currentColumn));

            if (removedIndex !== null && addedIndex !== null) {
                // Change card in one column
                const resData = {
                    id: column._id,
                    cardOrder: newCardOrder,
                };
                onUpdateColumn(resData);
            } else {
                // Change card in two column
                const resData = {
                    id: column._id,
                    cardOrder: newCardOrder,
                    cards: newCards,
                };
                if (addedIndex !== null) resData.cardAddTo = payload._id
                onUpdateColumn(resData);
            }
        },
        [column]
    );

    return (
        <div className="card-list">
            <Container
                groupName="col"
                getChildPayload={onGetChild}
                dragClass="card-ghost"
                dropClass="card-ghost-drop"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'card-drop-preview',
                }}
                dropPlaceholderAnimationDuration={200}
                onDrop={(data) => handleCardDrop(data)}
            >
                {cards?.map((card) => {
                    return (
                        <Draggable key={card._id}>
                            <CardItem card={card} />
                        </Draggable>
                    );
                })}
            </Container>
            {children}
        </div>
    );
};

export default CardList;
