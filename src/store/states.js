export default {
    //当前导航下标
    navCurrentIndex: 0,

    //当前的播放歌曲信息
    currentSongInfo: {
        url: '',
        id: '',
        name: '',
        album: '',
        singer: '',
        pic: '',
        totleTime: 0,//ms单位
        lyric:[],
    },
    
    //是否播放
    playing: false,

    //播放列表的信息
    songList: [],

    //当前播放歌曲的下标
    currentIndex: '',

    //当前播放到哪一刻 也豪秒为单位的值
    currentTime: '00:00',

    //是否加再图片
    isLoad: false,

    //某一个歌单里面歌曲的全部信息 （未筛选的）
    SongListAllInfos:[],

    //某一个歌单的全部歌曲url
    SongListAllUrls:[],

    //歌单详细信息
    songListDetailInfo: {},

    //随机数
    randomNumberIndex:0,

    //控制max-min播放器显示
    isShowMaxPlayer:false,

    //某一首歌的相似歌单信息
    SimiSongList:{},

    //某一首歌的评论数据
    commentInfo:{},


    //用户的全部歌单信息
    userSonglistInfo:[],

    //自己创建的歌单
    mySonglist:null,

    //心动歌单
    heartSonglist:null,

    //收藏的歌单
    collectSonglist:null,

    //全部的标签数据 弹出框
    allTypeInfo:{},

    //控制palylistdetail页面下的updata组件是否显示
    isShowUpdataComponent:false,

    //控制top-tabbar页面下的drawer组件是否显示
    isShowMsgDrawer:false,

    //控制top-tabbar页面下的innerdrawer组件是否显示
    isShowInnerMsgDrawer:false,

    toUserInfo:{},
}