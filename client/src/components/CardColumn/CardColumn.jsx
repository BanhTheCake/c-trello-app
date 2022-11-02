import CardList from '../CardList/CardList';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './CardColumn.scss';
import _ from 'lodash';
import CardColumnHeader from '../CardColumnHeader/CardColumnHeader';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setEachColumn } from '../../app/boardSlice';
import { useMutation } from 'react-query';
import { cards } from '../../api/cards';

const CardColumn = ({ column }) => {

    const boardId = useSelector((state) => state.board.board._id);

    const [isOpenFormAdd, setIsOpenFormAdd] = useState(false);
    const [formValue, setFormValue] = useState('');

    const dispatch = useDispatch();
    const formRef = useRef();

    const { mutate: onCreateNewCard } = useMutation(cards.createNewCard, {
        onSuccess: (newCard) => {

            const copyColumn = _.cloneDeep(column);
            copyColumn.cards.push(newCard);
            copyColumn.cardOrder.push(newCard._id);

            dispatch(setEachColumn(copyColumn));
            setFormValue('');
            setIsOpenFormAdd(false);
        },
        onError: (err) => {
            console.log(err);
        }
    })

    useEffect(() => {
        if (!isOpenFormAdd) return;
        if (formRef && formRef.current) {
            formRef.current.focus();
            formRef.current.select();
            formRef.current.scrollIntoView();
        }
    }, [isOpenFormAdd]);

    const handleToggleForm = () => {
        setIsOpenFormAdd(!isOpenFormAdd);
    };

    const handleAddNewCard = useCallback(() => {
        if (!formValue.trim() || formValue.trim().length < 5) {
            if (formRef && formRef.current) {
                formRef.current.focus();
            }
            return;
        }
        const newCard = {
            columnId: column._id,
            boardId: boardId,
            title: formValue.trim(),
        };

        onCreateNewCard(newCard)

    }, [formValue, formRef.current, boardId, column])

    const handleChangeValueForm = (e) => {
        e.preventDefault();
        setFormValue(e.target.value);
    };

    const handleEnterValueForm = (e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            handleAddNewCard();
        }
    };

    return (
        <div className="card-column">
            <CardColumnHeader
                title={column?.title}
                columnId={column?._id}
                setIsOpenFormAdd={setIsOpenFormAdd}
            />
            <CardList column={column}>
                {isOpenFormAdd && (
                    <div className="card-item__textarea">
                        <textarea
                            value={formValue}
                            onChange={handleChangeValueForm}
                            ref={formRef}
                            className="input"
                            rows="3"
                            onKeyDown={handleEnterValueForm}
                        ></textarea>
                    </div>
                )}
            </CardList>
            <div className="card-column__footer">
                {!isOpenFormAdd ? (
                    <>
                        <div className="icon-wrapper">
                            <AiOutlinePlus size={24} />
                        </div>
                        <p onClick={handleToggleForm}>Add another card</p>
                    </>
                ) : (
                    <>
                        <button className="btn" onClick={handleAddNewCard}>
                            Add
                        </button>
                        <div
                            className="icon-wrapper trash"
                            onClick={handleToggleForm}
                        >
                            <FiTrash2 size={28} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(CardColumn);
