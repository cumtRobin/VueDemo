import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import ImgProcess from '@/pages/ImgProcess'
import ImageMagnifier from '@/pages/ImageMagnifier'
import UserCamera from '@/pages/UserCamera'
import NewUserCamera from '@/pages/NewUserCamera'
import CameraAndUpload from '@/pages/CameraAndUpload'
import TreeDemo from '@/pages/TreeDemo'
import EchartsMap from '@/pages/EchartsMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/ImgProcess',
      name: 'ImgProcess',
      component: ImgProcess
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
    },
    {
      path: '/TreeDemo',
      name: 'TreeDemo',
      component: TreeDemo
    },
    {
      path: '/EchartsMap',
      name: 'EchartsMap',
      component: EchartsMap
    }
  ]
})
