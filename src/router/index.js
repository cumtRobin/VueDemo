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
import MarkdownToHtml from '@/pages/MarkdownToHtml'
import VideoJs from '@/pages/VideoJs'
import Lang from '@/pages/Lang'
import PdfViewer from '@/pages/PdfViewer'
import CanvasSignature from '@/pages/CanvasSignature'

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
    },
    {
      path: '/MarkdownToHtml',
      name: 'MarkdownToHtml',
      component: MarkdownToHtml
    },
    {
      path: '/VideoJs',
      name: 'VideoJs',
      component: VideoJs
    },
    {
      path: '/Lang',
      name: 'Lang',
      component: Lang
    },
    {
      path: '/PdfViewer',
      name: 'PdfViewer',
      component: PdfViewer
    },
    {
      path: '/CanvasSignature',
      name: 'CanvasSignature',
      component: CanvasSignature
    }
  ]
})
