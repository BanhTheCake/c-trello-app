import React, { useEffect, useRef, useState } from 'react';
import './CardColumnHeader.scss';
import { IoIosMore } from 'react-icons/io';
import useDoubleClick from '../../hooks/useDoubleClick';
import { useDispatch, useSelector } from 'react-redux';
import { setColumns, setColumnsOrder } from '../../app/boardSlice';
import ModalConfirmDeleteCol from '../ModalConfirmDeleteCol/ModalCofirmDeleteCol';
import { useMutation } from 'react-query';
import { columns as columnsApi } from '../../api/columns';

const CardColumnHeader = ({ title, columnId, setIsOpenFormAdd }) => {

    const [headerValue, setHeaderValue] = useState('');
    const [isEditHeader, setIsEditHeader] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const columns = useSelector((state) => state.board.columns);
    const columnOrder = useSelector((state) => state.board.board.columnOrder);

    const inputRef = useRef(null);

    const { mutate: onUpdateColumn } = useMutation(columnsApi.updateColumn, {
        onSuccess: (updateColumn) => {
            let copyColumns = [...columns];
            let currentColumn = copyColumns.find(
                (column) => column._id === columnId
            );
            currentColumn = { ...currentColumn, title: updateColumn.title };
            copyColumns = copyColumns.map((column) => {
                if (column?._id === columnId) {
                    return currentColumn;
                }
                return column;
            });
            dispatch(setColumns(copyColumns));
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const { mutate: onDeleteColumn } = useMutation(columnsApi.updateColumn, {
        onSuccess: () => {
            let copyColumns = [...columns];
            let copyColumnsOrder = [...columnOrder];

            copyColumns = copyColumns.filter(
                (column) => column._id !== columnId
            );
            copyColumnsOrder = copyColumnsOrder.filter((id) => id !== columnId);

            dispatch(setColumns(copyColumns));
            dispatch(setColumnsOrder(copyColumnsOrder));
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (!title) return;
        setHeaderValue(title);
    }, [title]);

    const handleDoubleClick = useDoubleClick(() => {
        setIsEditHeader(true);
    });

    useEffect(() => {
        if (!isEditHeader) return;
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditHeader]);

    const handleChangeTitle = (value) => {

        if (value === title ) return;

        const reqData = {
            id: columnId,
            title: value
        }

        onUpdateColumn(reqData)

    };

    const handleOnBlur = () => {
        if (headerValue.trim().length < 5) {
            if (inputRef && inputRef.current) {
                inputRef.current.focus();
            }
            return;
        }
        handleChangeTitle(headerValue.trim());
        setIsEditHeader(false);
    };

    const handleOnEnter = (e) => {
        if (e.keyCode !== 13) return;
        if (headerValue.trim().length < 5) {
            if (inputRef && inputRef.current) {
                inputRef.current.focus();
            }
            return;
        }
        handleChangeTitle(headerValue.trim());
        setIsEditHeader(false);
    };

    const handleChangeStateMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const handleDeleteColumn = (type) => {
        if (type === 'close') {
            setIsOpenModal(false);
            return;
        }

        if (type === 'confirm') {

            const reqData = {
                id: columnId,
                _destroy: true
            }

            onDeleteColumn(reqData)
        }
    };

    const handleOpenForm = () => {
        setIsOpenFormAdd(true)
        setIsOpenMenu(false)
    }

    return (
        <>
            <div className="card-column-header">
                <div className="title">
                    {isEditHeader ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={headerValue}
                            className={'input'}
                            onChange={(e) => setHeaderValue(e.target.value)}
                            onKeyDown={handleOnEnter}
                            onBlur={handleOnBlur}
                        />
                    ) : (
                        <h3
                            className="card-column-drag"
                            onClick={handleDoubleClick}
                        >
                            {' '}
                            {headerValue}{' '}
                        </h3>
                    )}
                </div>
                <div className="btn-more">
                    <div
                        className="icon-wrapper"
                        onClick={handleChangeStateMenu}
                    >
                        <IoIosMore size={26} />
                    </div>
                    {isOpenMenu && (
                        <>
                            <div
                                className="meu-more__overlay"
                                onClick={handleChangeStateMenu}
                            ></div>
                            <div className="menu-more">
                                <p onClick={handleOpenForm}>Add new cards</p>
                                <p onClick={() => setIsOpenModal(true)}>
                                    Remove columns
                                </p>
                                <p>Edit cards (Beta) </p>
                                <p>banhTheCake love you</p>
                            </div>
                        </>
                    )}
                </div>
                {/* {isOpenModal ? (
                    <ModalConfirmDeleteCol
                        title={'Are you sure to delete this columns !'}
                        onAction={handleDeleteColumn}
                    />
                ) : null} */}
                {isOpenModal && (
                    <ModalConfirmDeleteCol
                        title={'Are you sure to delete this columns !'}
                        onAction={handleDeleteColumn}
                    />
                )}
            </div>
        </>
    );
};

export default CardColumnHeader;
