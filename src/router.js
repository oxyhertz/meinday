import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import carApp from './views/car-app.vue'
import boardApp from './views/board-app.vue'
import boardsHome from './cmps/board/boards-home.vue'
import boardDetails from './cmps/board/board-details.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import chatPulse from './cmps/board/chat-pulse/chat-pulse.vue'
import playground from './views/playground.vue'
import groupList from './cmps/board/group/group-list.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/car',
    name: 'car-app',
    component: carApp,
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp,
  },
  {
    path: '/playground',
    name: 'playground',
    component: playground,
  },
  {
    path: '/board',
    name: 'board',
    component: boardApp,
    children: [
      {
        path: '',
        name: 'boards-home',
        component: boardsHome,
      },
      {
        path: ':boardId',
        name: 'board-details',
        component: boardDetails,
        children: [
          {
            path: '',
            name: 'boards-monday-list',
            component: groupList,
            children: [
              {
                path: 'pulse/:taskId',
                name: 'chat-pulse',
                component: chatPulse,
              },
            ],
          },
          // {
          //   path: 'pulse/:taskId',
          //   name: 'chat-pulse',
          //   component: chatPulse,
          // },
        ],
      },
    ],
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat,
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup,
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails,
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
