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
import PdfSignature from '@/pages/PdfSignature'
import DynamicFormTest from '@/pages/DynamicFormTest'
import CSSTest from '@/pages/CSSTest'
import SlotDemo from '@/pages/SlotDemo'
import SlotScopeDemo from '@/pages/SlotScopeDemo'
import Svg2img from '@/pages/Svg2img'

// 百度地图
import BaiduMap from '@/pages/baiduMap'
import ShowMap from '@/pages/baiduMap/showMap'
import AsyncLoadMap from '@/pages/baiduMap/asyncLoadMap'
import MapControl from '@/pages/baiduMap/mapControl'
import MapOverlay from '@/pages/baiduMap/mapOverlay'

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
    },
    {
      path: '/PdfSignature',
      name: 'PdfSignature',
      component: PdfSignature
    },
    {
      path: '/DynamicFormTest',
      name: 'DynamicFormTest',
      component: DynamicFormTest
    },
    {
      path: '/CSSTest',
      name: 'CSSTest',
      component: CSSTest
    },
    {
      path: '/SlotDemo',
      name: 'SlotDemo',
      component: SlotDemo
    },
    {
      path: '/SlotScopeDemo',
      name: 'SlotScopeDemo',
      component: SlotScopeDemo
    },
    {
      path: '/Svg2img',
      name: 'Svg2img',
      component: Svg2img
    },
    {
      path: '/baidumap',
      name: 'BaiduMap',
      component: BaiduMap,
      children: [
        { path: '', component: ShowMap },
        { path: 'async_load', component: AsyncLoadMap },
        { path: 'map_control', component: MapControl },
        { path: 'map_overlay', component: MapOverlay }
      ]
    },
    {
      path: '/iconfont',
      name: 'iconfont',
      component: () => import('@/pages/IconfontTest.vue')
    }
  ]
})
