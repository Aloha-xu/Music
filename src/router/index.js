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
                component: () => import('../views/find-music/song-list/song-list.vue')
            },
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
                component: () => import('../views/video/mv-component/mv.vue')
            },
            {
                path: '/video',
                component: () => import('../views/video/video-component/video.vue')
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
        component: () => import('../views/cloud-search/cloud-search.vue'),
    },
    {
        path: '/allmvpapg',
        component: () => import('../views/video/all-mv-papg/all-mv-papg.vue'),
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
// const CollectSongList =()=>import('../views/collect-song-list/collect-song-list.vue')
// const CreateSongList =()=>import('../views/create-song-list/create-song-list.vue')
// const FindMusic =()=>import('../views/find-music/find-music.vue')
// const Friend =()=>import('../views/friend/friend.vue')
// const Live =()=>import('../views/live/live.vue')
// const VideoHome =()=>import('../views/video/video-home.vue')
// const PrivateFM =()=>import('../views/private-fm/private-fm.vue')
// const Collect =()=>import('../views/mine/collect/collect.vue')
// const IcloudMusic =()=>import('../views/mine/icloud-music/icloud-music.vue')
// const LocalMusic =()=>import('../views/mine/local-music/local-music.vue')
// const LocalManage =()=>import('../views/mine/local-manage/local-manage.vue')
// const Radio =()=>import('../views/mine/radio/radio.vue')
// const Recommend =()=>import('../views/find-music/recommend/recommend.vue')
// const AnchorRadio =()=>import('../views/find-music/anchor-radio/anchor-radio.vue')
// const NewMusic =()=>import('../views/find-music/new-music/new-music.vue')
// const Rank =()=>import('../views/find-music/rank/rank.vue')
// const Singer =()=>import('../views/find-music/singer/singer.vue')
// const SongList =()=>import('../views/find-music/song-list/song-list.vue')
// const PlayListDetail =()=>import('../views/play-list-detail/play-list-detail.vue')
// const AlbumListDetail =()=>import('../views/album-list-detail/album-list-detail.vue')
// const SingerListDetail =()=>import('../views/singer-list-detail/singer-list-detail.vue')
// const CloudSearch =()=>import('../views/cloud-search/cloud-search.vue')
// const Mv =()=>import('../views/video/mv-component/mv.vue')
// const Video =()=>import('../views/video/video-component/video.vue')
// const AllMvPapg =()=>import('../views/video/all-mv-papg/all-mv-papg.vue')
// const MvDetail =()=>import('../views/mv-detail/mv-detail.vue')
// const UpDataPapg =()=>import('../views/user-updata-papg/updata-papg.vue')
// const UserDetail =()=>import('../views/user-detail/user-detail.vue')


// //使用VueRouter
// Vue.use(VueRouter)
// const routes=[
//     {
//         path:'',
//         redirect:'/findmusic'
//     },
//     {
//         path:'/findmusic',
//         component:FindMusic,
//         redirect:'/recommend',
//         children:[
//             {
//                 path:'/recommend',
//                 component:Recommend,

//             },
//             {
//                 path:'/anchorradio',
//                 component:AnchorRadio
//             },
//             {
//                 path:'/newmusic',
//                 component:NewMusic
//             },
//             {
//                 path:'/rank',
//                 component:Rank
//             },
//             {
//                 path:'/singer',
//                 component:Singer
//             },
//             {
//                 path:'/songlist',
//                 component:SongList
//             },
//         ]
//     },
//     {
//         path:'/friend',
//         component:Friend
//     },
//     {
//         path:'/live',
//         component:Live
//     },
//     {
//         path:'/videohome',
//         component:VideoHome,
//         redirect:'/video',
//         children:[
//             {
//                 path:'/mv',
//                 component:Mv
//             },
//             {
//                 path:'/video',
//                 component:Video
//             }
//         ]
//     },
//     {
//         path:'/fm',
//         component:PrivateFM
//     },
//     {
//         path:'/collect',
//         component:Collect
//     },
//     {
//         path:'/icloudmusic',
//         component:IcloudMusic
//     },
//     {
//         path:'/localmusci',
//         component:LocalMusic
//     },
//     {
//         path:'/localmanage',
//         component:LocalManage
//     },
//     {
//         path:'/radio',
//         component:Radio
//     },
//     {
//         path:'/createsongcates',
//         component:CreateSongList
//     },
//     {
//         path:'/collectsongcates',
//         component:CollectSongList
//     },
//     {
//         path:'/playlistdetail/:id',
//         component:PlayListDetail,
//     },
//     {
//         path:'/albumlistdetail/:id',
//         component:AlbumListDetail,
//     },
//     {
//         path:'/singerlistdetail/:id',
//         component:SingerListDetail,
//     },
//     {
//         path:'/cloudsearch',
//         component:CloudSearch,
//     },
//     {
//         path:'/allmvpapg',
//         component:AllMvPapg,
//     },
//     {
//         path:'/mvdetail/:id',
//         component:MvDetail,
//     },
//     {
//         path:'/userupdata/:id',
//         component:UpDataPapg,
//     },
//     {
//         path:'/userdetail/:id',
//         component:UserDetail,
//     },
// ]



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