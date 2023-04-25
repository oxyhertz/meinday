import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  getDuplicatedTask,
  updateTask,
  getChatMsg,
}
window.cs = boardService

async function query(filterBy = { title: '' }) {
  var boards = await storageService.query(STORAGE_KEY)
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, 'i')
    boards = boards.filter((board) => regex.test(board.title))
  }
  if (filterBy.price) {
    boards = boards.filter((board) => board.price <= filterBy.price)
  }
  return boards
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board)
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser()
    savedBoard = await storageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

async function updateTask(task, boardId) {
  const board = await getById(boardId)
  const groupIdx = board.groups.findIndex((group) =>
    group.tasks.some((currTask) => currTask.id === task.id)
  )
  const taskIdx = board.groups[groupIdx].tasks.findIndex(
    (currTask) => currTask.id === task.id
  )
  console.log('board:', board)
  board.groups[groupIdx].tasks.splice(taskIdx, 1, task)
  await storageService.put(STORAGE_KEY, board)
  return board
}

async function removeTasks(tasks) {}

function getDuplicatedTask(task) {
  const newTask = JSON.parse(JSON.stringify(task))
  newTask.id = utilService.makeId()
  newTask.title += ' (copy)'
  return newTask
}

//  {
//                 id: 'ZdPnm',
//                 txt: 'also @yaronb please CR this',
//                 createdAt: 1590999817436,
//                 byMember: {
//                   _id: 'u101',
//                   fullname: 'Tal Tarablus',
//                   imgUrl:
//                     'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
//                 },
//               },

function getChatMsg(content) {
  return {
    id: utilService.makeId(),
    byMember: userService.getLoggedinUser(),
    likes: [],
    createdAt: Date.now(),
    content,
  }
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId)
  if (!board.msgs) board.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function getEmptyBoard() {
  return {
    _id: 'b101',
    title: 'Robot dev proj',
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo',
          },
          {
            id: 'c102',
            title: 'Add Samples',
          },
        ],
        style: {
          color: getRandom,
        },
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that',
            archivedAt: 1589983468418,
          },
          {
            id: 'c104',
            title: 'Help me',
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                content: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],

            members: [
              [
                {
                  _id: 'u102',
                  fullname: 'Avery Lee',
                  imgUrl:
                    'http://res.cloudinary.com/averylee/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                {
                  _id: 'u103',
                  fullname: 'Samantha Johnson',
                  imgUrl:
                    'http://res.cloudinary.com/samanthaj/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                {
                  _id: 'u104',
                  fullname: 'Juan Rodriguez',
                  imgUrl:
                    'http://res.cloudinary.com/jrodriguez/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            ],
            labelIds: ['l101', 'l102'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        content: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
    cmpsOrder: ['status', 'members', 'date', 'priority'],
  }
}

// TEST DATA
;(async () => {
  await storageService.post(STORAGE_KEY, {
    _id: 'b101',
    title: 'Robot dev proj',
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u102',
        fullname: 'Avery Lee',
        imgUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        _id: 'u103',
        fullname: 'Samantha Johnson',
        imgUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
      },
      {
        _id: 'u104',
        fullname: 'Juan Rodriguez',
        imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c122204',
            title: 'Help me',
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                content: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            members: [
              {
                _id: 'u102',
                fullname: 'Avery Lee',
                imgUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
              },
              {
                _id: 'u103',
                fullname: 'Samantha Johnson',
                imgUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
              },
              // {
              //   _id: 'u104',
              //   fullname: 'Juan Rodriguez',
              //   imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
              // },
            ],
            labelIds: ['l101', 'l102'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
        ],
        style: {
          color: utilService.getRandomColor(),
        },
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c104',
            title: 'Help me',
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                content: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            members: [
              {
                _id: 'u102',
                fullname: 'Avery Lee',
                imgUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
              },
              {
                _id: 'u103',
                fullname: 'Samantha Johnson',
                imgUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
              },
              // {
              //   _id: 'u104',
              //   fullname: 'Juan Rodriguez',
              //   imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
              // },
            ],
            labelIds: ['l101', 'l102'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
          {
            id: 'c1024',
            title: 'Help me',
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                content: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            members: [
              {
                _id: 'u102',
                fullname: 'Avery Lee',
                imgUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
              },
              {
                _id: 'u103',
                fullname: 'Samantha Johnson',
                imgUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
              },
              // {
              //   _id: 'u104',
              //   fullname: 'Juan Rodriguez',
              //   imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
              // },
            ],
            labelIds: ['l101', 'l102'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
        ],
        style: {
          color: utilService.getRandomColor(),
        },
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],

    cmpsOrder: ['status', 'members', 'date', 'priority'],
  })
})()
