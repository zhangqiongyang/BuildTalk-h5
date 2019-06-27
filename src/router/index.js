import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import allAuthor from '@/components/allAuthor'
import mine from '@/components/mine'
import allCourse from '@/components/allCourse'
import author from '@/components/author'
import list from '@/components/list'
import activity from '@/components/activity'
import article_video from '@/components/article_video'
import buy from '@/components/buy'
import search from '@/components/search'
import message from '@/components/message'
import myAddress from '@/components/myAddress'
import alreadyBought from '@/components/alreadyBought'
import myMsg from '@/components/myMsg'
import myMsgDetails from '@/components/myMsgDetails'
import phone from '@/components/phone'
import allNews from '@/components/allNews'
import authorDesc from '@/components/authorDesc'
import circleDetails from '@/components/circleDetails'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/allAuthor',
      name: 'allAuthor',
      component: allAuthor
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/allCourse',
      name: 'allCourse',
      component: allCourse
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/author/:dataobj',
      name: 'author',
      component: author
    },
    {
      path: '/list/:dataobj',
      name: 'list',
      component: list
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/article_video/:dataobj/:course_id',
      name: 'article_video',
      component: article_video
    },
    {
      path: '/buy/:dataobj',
      name: 'buy',
      component: buy
    },
    {
      path: '/message/:dataobj',
      name: 'message',
      component: message
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: myAddress
    },
    {
      path: '/alreadyBought',
      name: 'alreadyBought',
      component: alreadyBought
    },
    {
      path: '/myMsg',
      name: 'myMsg',
      component: myMsg
    },
    {
      path: '/myMsgDetails/:dataobj',
      name: 'myMsgDetails',
      component: myMsgDetails
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone
    },
    {
      path: '/allNews',
      name: 'allNews',
      component: allNews
    },
    {
      path: '/authorDesc',
      name: 'authorDesc',
      component: authorDesc
    },
    {
      path: '/circleDetails',
      name: 'circleDetails',
      component: circleDetails
    }
  ]
})
