export const taskStore = {
  state: {
    selectedTasks: [],
    currentTask: null,
  },
  getters: {
    selectedTasks({ selectedTasks }) {
      return selectedTasks
    },
    currentTask({ currentTask }) {
      return currentTask
    },
  },
  mutations: {
    setTask(state, { task }) {
      state.selectedTasks = [task, ...state.selectedTasks]
    },
    setCurrentTask(state, { task }) {
      state.currentTask = task
    },
    setTasks(state, { tasks }) {
      //Check if duplicates
      const uniqueTasks = tasks.filter(
        (task) => !state.selectedTasks.find((t) => task.id === t.id)
      )

      state.selectedTasks = [...uniqueTasks, ...state.selectedTasks]
    },
    clearTasks(state, { tasks }) {
      state.selectedTasks = []
    },
    removeTask(state, { taskId }) {
      state.selectedTasks = state.selectedTasks.filter(
        (task) => task.id !== taskId
      )
    },
    removeTasks(state, { tasks }) {
      state.selectedTasks = state.selectedTasks.filter(
        (t) => !tasks.find((task) => task.id === t.id)
      )
    },
  },
  actions: {
    async loadCurrentTask({ commit, rootState }, { taskId }) {
      try {
        console.log('taskId:', taskId)
        console.log('rootState:', rootState)
        const task = rootState.boardStore.board.groups
          .flatMap((group) => group.tasks)
          .find((task) => task.id === taskId)
        commit({ type: 'setCurrentTask', task })
        return task
      } catch (err) {
        console.log('taskStore: Error in loading task', err)
        throw err
      }
    },
    async addSelectedTask({ commit }, { task }) {
      try {
        commit({ type: 'setTask', task })
        return task
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async addSelectedTasks({ commit }, { tasks }) {
      try {
        commit({ type: 'setTasks', tasks })
        return tasks
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async removeSelectedTask({ commit }, { taskId }) {
      try {
        commit({ type: 'removeTask', taskId })
        return taskId
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async removeSelectedTasks({ commit }, { tasks }) {
      try {
        commit({ type: 'removeTasks', tasks })
        return tasks
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async clearSelectedTasks({ commit }) {
      try {
        commit({ type: 'clearTasks' })
        return []
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async addTasks({ commit }, { tasks }) {
      try {
        commit({ type: 'setTask', tasks })
        return tasks
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
  },
}
