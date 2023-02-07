export const taskStore = {
  state: {
    selectedTasks: [],
  },
  getters: {
    selectedTasks({ selectedTasks }) {
      return selectedTasks
    },
  },
  mutations: {
    setTask(state, { task }) {
      state.selectedTasks = [task, ...state.selectedTasks]
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
