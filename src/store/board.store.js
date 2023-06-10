import { boardService } from '../services/board.service.local'
export function getActionRemoveBoard(boardId) {
  return {
    type: 'removeBoard',
    boardId,
  }
}
export function getActionAddBoard(board) {
  return {
    type: 'addBoard',
    board,
  }
}
export function getActionUpdateBoard(board) {
  return {
    type: 'updateBoard',
    board,
  }
}

export function getActionAddBoardMsg(boardId) {
  return {
    type: 'addBoardMsg',
    boardId,
    txt: 'Stam txt',
  }
}

export const boardStore = {
  state: {
    boards: [],
    board: null,
  },
  getters: {
    board({ board }) {
      return board
    },
    boards({ boards }) {
      return boards
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
    addBoard(state, { board }) {
      state.boards.push(board)
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex((c) => c.id === board._id)
      state.boards.splice(idx, 1, board)
      state.board = board
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId)
    },
    addBoardMsg(state, { boardId, msg }) {
      const board = state.boards.find((board) => board._id === boardId)
      if (!board.msgs) board.msgs = []
      board.msgs.push(msg)
    },
    upadateTask(state, { task }) {
      const group = state.board.groups.find((group) =>
        group.tasks.some((t) => t.id === task.id)
      )
      const idx = group.tasks.findIndex((t) => t.id === task.id)
      group.tasks.splice(idx, 1, task)
      state.board = { ...state.board }
    },
    addTask(state, { groupId, taskTitle }) {
      const group = state.board.groups.find((group) => group.id === groupId)
      const task = boardService.getEmptyTask(taskTitle)
      console.log('🚀 ~ file: board.store.js:76 ~ addTask ~ task:', task)
      group.tasks.push(task)
      state.board = { ...state.board }
    },
  },
  actions: {
    async addBoard(context, { board }) {
      try {
        board = await boardService.save(board)
        context.commit(getActionAddBoard(board))
        return board
      } catch (err) {
        console.log('boardStore: Error in addBoard', err)
        throw err
      }
    },
    async updateBoard(context, { board }) {
      try {
        context.commit(getActionUpdateBoard(board))
        board = await boardService.save(board)
        return board
      } catch (err) {
        console.log('boardStore: Error in updateBoard', err)
        throw err
      }
    },
    async loadBoard(context, { boardId }) {
      try {
        const board = await boardService.getById(boardId)
        context.commit({ type: 'setBoard', board })
      } catch (err) {
        console.log('boardStore: Error in loadBoards', err)
        throw err
      }
    },
    async loadBoards(context) {
      try {
        const boards = await boardService.query()
        context.commit({ type: 'setBoards', boards })
      } catch (err) {
        console.log('boardStore: Error in loadBoards', err)
        throw err
      }
    },
    async removeBoard(context, { boardId }) {
      try {
        await boardService.remove(boardId)
        context.commit(getActionRemoveBoard(boardId))
      } catch (err) {
        console.log('boardStore: Error in removeBoard', err)
        throw err
      }
    },
    async updateCmpsOrder(context, { boardId, cmpsOrder }) {
      try {
        const newBoard = JSON.parse(JSON.stringify(context.state.board))
        newBoard.cmpsOrder = cmpsOrder
      } catch (err) {
        console.log('boardStore: Error in addBoardMsg', err)
        throw err
      }
    },
    async addBoardMsg(context, { boardId, txt }) {
      try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        context.commit({ type: 'addBoardMsg', boardId, msg })
      } catch (err) {
        console.log('boardStore: Error in addBoardMsg', err)
        throw err
      }
    },
    async duplicateTasks(context, { tasks }) {
      try {
        const newBoard = JSON.parse(JSON.stringify(context.state.board))
        tasks.forEach((t) => {
          const group = newBoard.groups.find((g) =>
            g.tasks.find((task) => task.id === t.id)
          )
          const newTask = boardService.getDuplicatedTask(t)
          group.tasks.push(newTask)
        })
        context.dispatch({ type: 'updateBoard', board: newBoard })
      } catch (err) {
        console.log('boardStore: Error in addBoardMsg', err)
        throw err
      }
    },
    async removeTasks(context, { tasks }) {
      try {
        const newBoard = JSON.parse(JSON.stringify(context.state.board))
        newBoard.groups.forEach((group) => {
          group.tasks = group.tasks.filter(
            (t) => !tasks.find((selectedTask) => selectedTask.id === t.id)
          )
        })
        context.dispatch({ type: 'updateBoard', board: newBoard })
      } catch (err) {
        console.log('boardStore: Error in addBoardMsg', err)
        throw err
      }
    },
    async addTask(context, { taskTitle, groupId }) {
      try {
        context.commit({ type: 'addTask', taskTitle, groupId })
        await boardService.save(context.state.board)
      } catch (error) {
        console.log('boardStore: Error in adding task', err)
        throw err
      }
    },
  },
}
