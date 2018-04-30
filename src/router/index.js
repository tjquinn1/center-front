import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewClient from '@/components/NewClient'
import Login from '@/components/Login'
import Project from '@/components/Project'
import AddTask from '@/components/AddTask'
import TimeHome from '@/components/TimeHome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/task/add',
      name: 'AddTask',
      component: AddTask
    },
    {
      path: '/time',
      name: 'TimeHome',
      component: TimeHome
    }
  ]
})
