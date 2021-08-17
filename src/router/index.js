import Vue from 'vue'
import VueRouter from 'vue-router'

//可以使用路由懒加载减少用户在首页的时候等待的事件 优化使用体验
//使用VueRouter
Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect: '/findmusic'
    },
    {
        path: '/findmusic',
        component: () => import('../views/find-music/find-music.vue'),
        redirect: '/recommend',
        children: [
            {
                path: '/recommend',
                component: () => import('../views/find-music/recommend/recommend.vue'),
            },
            {
                path: '/anchorradio',
                component: () => import('../views/find-music/anchor-radio/anchor-radio.vue')
            },
            {
                path: '/newmusic',
                component: () => import('../views/find-music/new-music/new-music.vue')
            },
            {
                path: '/rank',
                component: () => import('../views/find-music/rank/rank.vue')
            },
            {
                path: '/singer',
                component: () => import('../views/find-music/singer/singer.vue')
            },
            {
                path: '/songlist',
                component: () => import('../views/find-music/song-list/song-list.vue'),
            },
            {
                path: '/highqualityplaylist',
                component: () => import('../views/high-quality-playlist/high-quality-playlist.vue')
            }
        ]
    },
    {
        path: '/friend',
        component: () => import('../views/friend/friend.vue')
    },
    {
        path: '/live',
        component: () => import('../views/live/live.vue')
    },
    {
        path: '/videohome',
        component: () => import('../views/video/video-home.vue'),
        redirect: '/video',
        children: [
            {
                path: '/mv',
                component: () => import('../views/video/mv.vue')
            },
            {
                path: '/video',
                component: () => import('../views/video/video.vue')
            }
        ]
    },
    {
        path: '/fm',
        component: () => import('../views/private-fm/private-fm.vue')
    },
    {
        path: '/collect',
        component: () => import('../views/mine/collect/collect.vue')
    },
    {
        path: '/icloudmusic',
        component: () => import('../views/mine/icloud-music/icloud-music.vue')
    },
    {
        path: '/localmusci',
        component: () => import('../views/mine/local-music/local-music.vue')
    },
    {
        path: '/localmanage',
        component: () => import('../views/mine/local-manage/local-manage.vue')
    },
    {
        path: '/radio',
        component: () => import('../views/mine/radio/radio.vue')
    },
    {
        path: '/createsongcates',
        component: () => import('../views/create-song-list/create-song-list.vue')
    },
    {
        path: '/collectsongcates',
        component: () => import('../views/collect-song-list/collect-song-list.vue')
    },
    {
        path: '/playlistdetail/:id',
        component: () => import('../views/play-list-detail/play-list-detail.vue'),
    },
    {
        path: '/albumlistdetail/:id',
        component: () => import('../views/album-list-detail/album-list-detail.vue'),
    },
    {
        path: '/singerlistdetail/:id',
        component: () => import('../views/singer-list-detail/singer-list-detail.vue'),
    },
    {
        path: '/cloudsearch',
        component: () => import('../views/search-detail/search-detail.vue'),
    },
    {
        path: '/allmvpapg',
        component: () => import('../views/video/all-mv-papg.vue'),
    },
    {
        path: '/mvdetail/:id',
        component: () => import('../views/mv-detail/mv-detail.vue'),
    },
    {
        path: '/userupdata/:id',
        component: () => import('../views/user-updata-papg/updata-papg.vue'),
    },
    {
        path: '/userdetail/:id',
        component: () => import('../views/user-detail/user-detail.vue'),
    },
]

//注册router
const router = new VueRouter({
    routes,
    mode: "history"
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//导出router
export default router