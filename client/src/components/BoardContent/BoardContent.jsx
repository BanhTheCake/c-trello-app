import CardColumn from '../CardColumn/CardColumn';
import React, { useEffect, useMemo, useState } from 'react';
import './BoardContent.scss';
import _ from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import applyDrag from '../../utils/applyDrag.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    setBoard,
    setColumns,
    setColumnsOrder,
} from '../../app/boardSlice';
import BtnAddNewColumn from '../BtnAddNewColumn/BtnAddNewColumn';
import { useMutation, useQuery } from 'react-query';
import { boards } from '../../api/boards';

const BoardContent = () => {
    const { isLoading: isGetBoardData } = useQuery(
        ['fetchBoardById', '63612ca8310f84bd3854bf87'],
        boards.fetchBoardById,
        {
            onSuccess: (data) => {
                const { columns, columnOrder, _id } = data;
                dispatch(setColumns(columns));
                dispatch(setBoard({ _id, columnOrder }));
            },
            onError: (err) => console.log(err),
            refetchOnWindowFocus: false,
            retry: 0,
            select: (resData) => resData.data || [],
        }
    );

    const { mutate: onUpdateBoard } = useMutation(boards.updateOne, {
        onError: (err) => {
            console.log(err);
            dispatch(setColumnsOrder(columnOrder));
        }
    })

    const columnOrder = useSelector((state) => state.board?.board?.columnOrder);
    const columns = useSelector((state) => state.board.columns);

    const dispatch = useDispatch()


    const sortedColumns = useMemo(() => {
        if (_.isEmpty(columns) || _.isEmpty(columnOrder)) return [];

        const data = _.sortBy(columns, (column) => {
            return columnOrder.indexOf(column._id);
        });
        return data;
    }, [columns, columnOrder]);

    const onColumnDrop = (payloadData) => {
        if (payloadData.removedIndex === payloadData.addedIndex) return;
        const newColumn = applyDrag(sortedColumns, payloadData);
        const newColumnOrder = newColumn.map((column) => column._id);

        const reqData = {
            id: '63612ca8310f84bd3854bf87',
            columnOrder: newColumnOrder
        }
        dispatch(setColumnsOrder(newColumnOrder));
        onUpdateBoard(reqData)
    };

    return (
        <>
            <div className="board-content">
                <Container
                    dragClass="board-content"
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    dragHandleSelector=".card-column-drag"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'cards-drop-preview',
                    }}
                    getChildPayload={(index) => sortedColumns[index]}
                >
                    {sortedColumns?.map((column) => {
                        return (
                            <Draggable key={column._id}>
                                <CardColumn column={column} />
                            </Draggable>
                        );
                    })}
                </Container>
                <BtnAddNewColumn />
            </div>
        </>
    );
};

export default BoardContent;
