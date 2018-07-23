import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import TestProcess from '@/pages/TestProcess'
import ImageMagnifier from '@/pages/ImageMagnifier'
import UserCamera from '@/pages/UserCamera'
import NewUserCamera from '@/pages/NewUserCamera'
import CameraAndUpload from '@/pages/CameraAndUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/TestProcess',
      name: 'TestProcess',
      component: TestProcess
    },
    {
      path: '/ImageMagnifier',
      name: 'ImageMagnifier',
      component: ImageMagnifier
    },
    {
      path: '/UserCamera',
      name: 'UserCamera',
      component: UserCamera
    },
    {
      path: '/NewUserCamera',
      name: 'NewUserCamera',
      component: NewUserCamera
    },
    {
      path: '/CameraAndUpload',
      name: 'CameraAndUpload',
      component: CameraAndUpload
    }
  ]
})
