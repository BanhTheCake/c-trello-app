import React, { useEffect, useRef, useState } from 'react';
import './BtnAddNewColumn.scss';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard, setColumns, setColumnsOrder } from '../../app/boardSlice';
import { useMutation } from 'react-query';
import { columns as columnsApi } from '../../api/columns';

const BtnAddNewColumn = () => {
    const boardId = useSelector((state) => state.board.board._id);
    const columnOrder = useSelector((state) => state.board.board.columnOrder);
    const columns = useSelector((state) => state.board.columns);

    const [isOpenBox, setIsOpenBox] = useState(false);
    const [inputText, setInputText] = useState('');

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const { mutate: onCreateNewColumn } = useMutation(
        columnsApi.createNewColumn,
        {
            onSuccess: (newColumn) => {
                let currentColumnsOrder = [...columnOrder];

                currentColumnsOrder = [...currentColumnsOrder, newColumn._id];
                const currentColumns = [...columns, newColumn];

                dispatch(setColumnsOrder(currentColumnsOrder));
                dispatch(setColumns(currentColumns));

                setIsOpenBox(!isOpenBox);
                setInputText('');
            },
            onError: (err) => console.log(err),
        }
    );

    useEffect(() => {
        if (!isOpenBox) return;

        if (inputRef && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isOpenBox]);

    const handleToggleBox = () => {
        setIsOpenBox(!isOpenBox);
    };

    const handleChangeInput = (e) => {
        setInputText(e.target.value);
    };

    const handleAddNewColumn = () => {
        if (!inputText.trim() || inputText.trim().length < 5) {
            inputRef.current.focus();
            return;
        }

        const newColumn = {
            boardId: boardId,
            title: inputText.trim(),
        };

        console.log(newColumn);

        onCreateNewColumn(newColumn);
    };

    const handleEnterInput = (e) => {
        if (e.keyCode === 13) {
            handleAddNewColumn();
        }
    };

    return (
        <div className="btn-add-new">
            {isOpenBox ? (
                <div className="btn-add-new__input">
                    <input
                        ref={inputRef}
                        className="input"
                        type="text"
                        placeholder="Enter name ..."
                        value={inputText}
                        onChange={handleChangeInput}
                        onKeyDown={handleEnterInput}
                    />
                    <div className="btn-add-new__box">
                        <button className="btn" onClick={handleAddNewColumn}>
                            Add
                        </button>
                        <FiTrash2 size={28} onClick={handleToggleBox} />
                    </div>
                </div>
            ) : (
                <div className="btn-add-new__toggle" onClick={handleToggleBox}>
                    <FiPlus size={28} />
                    <p>Add new column</p>
                </div>
            )}
        </div>
    );
};

export default BtnAddNewColumn;
