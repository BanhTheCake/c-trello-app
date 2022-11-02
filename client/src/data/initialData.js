export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-2', 'column-1', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'Todo Today',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        {
                            id: 'card-1',
                            columnId: 'column-1',
                            boardId: 'board-1',
                            title: 'BanhTheCake with love',
                            // cover: null,
                            cover: 'https://images.unsplash.com/photo-1666545459280-511796ce1d2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=864&q=80',
                        },
                        { id: 'card-2', columnId: 'column-1', boardId: 'board-1', title: 'Title card 2', cover: null },
                        { id: 'card-3', columnId: 'column-1', boardId: 'board-1', title: 'Title card 3', cover: null },
                        { id: 'card-4', columnId: 'column-1', boardId: 'board-1', title: 'Title card 4', cover: null },
                        { id: 'card-5', columnId: 'column-1', boardId: 'board-1', title: 'Title card 5', cover: null },
                        { id: 'card-6', columnId: 'column-1', boardId: 'board-1', title: 'Title card 6', cover: null },
                        { id: 'card-7', columnId: 'column-1', boardId: 'board-1', title: 'Title card 7', cover: null },
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Do something',
                    cardOrder: ['card-9', 'card-8', 'card-10', 'card-11'],
                    cards: [
                        { id: 'card-8', columnId: 'column-2', boardId: 'board-1', title: 'Title card 8', cover: null },
                        { id: 'card-9', columnId: 'column-2', boardId: 'board-1', title: 'Title card 9', cover: null },
                        { id: 'card-10', columnId: 'column-2', boardId: 'board-1', title: 'Title card 10', cover: null },
                        { id: 'card-11', columnId: 'column-2', boardId: 'board-1', title: 'Title card 11', cover: null },
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done',
                    cardOrder: ['card-12', 'card-13', 'card-14'],
                    cards: [
                        { id: 'card-12', columnId: 'column-3', boardId: 'board-1', title: 'Title card 12', cover: null },
                        { id: 'card-13', columnId: 'column-3', boardId: 'board-1', title: 'Title card 13', cover: null },
                        { id: 'card-14', columnId: 'column-3', boardId: 'board-1', title: 'Title card 14', cover: null },
                    ]
                }
            ]
        }
    ]
}