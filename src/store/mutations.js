//处理同步的操作
export default {

    //更改当前正在播放的歌曲的信息
    changeCurrentPlay(state, currentsonginfo) {
        state.currentSongInfo = currentsonginfo
    },

    //设置播放状态
    play(state) {
        state.playing = true
        console.log('stop')
    },

    //设置暂停状态
    stop(state) {
        state.playing = false
        console.log('play')
    },

    //把歌单所有的歌曲放到state的currentSongListAllInfos中方法 数据没筛选
    setAllSongListInfo(state, allSongList) {
        state.SongListAllInfos = allSongList
    },

    //已经赛选后的数据放到播放列表中
    setSongListInfo(state, songList) {
        state.songList = songList
    },

    //添加歌曲url
    setAllSongUrls(state, urls) {
        state.SongListAllUrls = urls
    },

    //把歌单的全部歌曲添加到播放列表
    setAllSongsToPlayList(state) {
        for (let i = 0; i < state.SongListAllInfos.length; i++) {
            let currentsonginfo = {};
            currentsonginfo.url = state.SongListAllUrls.data.data[i].url;
            currentsonginfo.id = state.SongListAllInfos[i].id;
            currentsonginfo.name = state.SongListAllInfos[i].name;
            currentsonginfo.singer = state.SongListAllInfos[i].ar.map(({ name }) => name);
            currentsonginfo.pic = state.SongListAllInfos[i].al.picUrl;
            currentsonginfo.totleTime = state.SongListAllInfos[i].dt;
            currentsonginfo.lyric = []
            currentsonginfo.album = state.SongListAllInfos[i].al.name;
            //把歌曲放到播放列表中 
            state.songList.push(currentsonginfo)
        }
    },

    //播放歌单列表的第一首歌
    setPlayFirstSong(state) {
        let currentsonginfo = {};
        currentsonginfo.url = state.SongListAllUrls.data.data[0].url;
        currentsonginfo.id = state.SongListAllInfos[0].id;
        currentsonginfo.name = state.SongListAllInfos[0].name;
        currentsonginfo.singer = state.SongListAllInfos[0].ar.map(({ name }) => name);
        currentsonginfo.pic = state.SongListAllInfos[0].al.picUrl;
        currentsonginfo.totleTime = state.SongListAllInfos[0].dt;
        currentsonginfo.lyric = []
        currentsonginfo.album = state.SongListAllInfos[0].al.name;
        state.currentSongInfo = currentsonginfo
    },

    //列表循环  这里还没有写完列表循环与顺序循环的选择 我觉得列表循环是已有的列表中循环播放然而这个顺序循环就是按照你点进去的歌单 直接把这个歌单放到列表中 再播放 这个功能后续写
    //⭐⭐currentPlayIndex  currentIndex 这两个下标一样的 懒得改

    setNextSong(state) {
        let currentPlayIndex = state.songList.findIndex(item => item.id == state.currentSongInfo.id)
        //判断有没有下一首
        if (currentPlayIndex + 1 == state.songList.length) {
            console.log('这是最后一首歌')
            return
        } else {
            state.currentSongInfo = state.songList[currentPlayIndex + 1]
        }
        //更换现在播放歌曲的下标
        state.currentIndex = state.currentIndex + 1
    },

    //列表循环上一首
    setPreSong(state) {
        let currentPlayIndex = state.songList.findIndex(item => item.id == state.currentSongInfo.id)
        if (currentPlayIndex == 0) {
            console.log('这是第一首歌')
            return
        } else {
            state.currentSongInfo = state.songList[currentPlayIndex - 1]
        }
        //更换现在播放歌曲的下标
        state.currentIndex = state.currentIndex - 1
    },

    //随机播放下一首
    randomPlayWay(state) {
        state.randomNumberIndex = Math.floor((Math.random() * 100) + 1) //随机1-100的数字
        // console.log(state.randomNumberIndex)
        while (state.randomNumberIndex > state.songList.length) {
            state.randomNumberIndex = Math.floor((Math.random() * 100) + 1)
            // console.log(state.randomNumberIndex)
            // console.log(randomNumberIndex)
        }
        state.currentSongInfo = state.songList[state.randomNumberIndex - 1]
        state.currentIndex = state.randomNumberIndex - 1
        // console.log(state.randomNumberIndex)
    },

    //单曲循环
    singlePlayWay(state) {
        let currentPlayIndex = state.songList.findIndex(item => item.id == state.currentSongInfo.id)
        state.currentPlayIndex = state.songList[currentPlayIndex]
        state.currentIndex = currentPlayIndex
    },

    //删除
    deleteSong(state, id) {
        //找到需要删除的歌曲的下标
        let deleteIndex = state.songList.findIndex(item => item.id == id)
        state.songList.splice(deleteIndex, 1)
        //判断删除的下标与现在播放的下标是否一样
        if (state.currentIndex === deleteIndex) {
            //播放下一首
            if (deleteIndex + 1 == state.songList.length) {//是最后一首
                state.currentSongInfo = state.songList[deleteIndex--]
                //⭐⭐为什么删除最后一首歌currentSongInfo会undefind？？？
                state.currentIndex = deleteIndex - 1
            } else {//不是最后一首
                state.currentSongInfo = state.songList[deleteIndex]
                state.currentIndex = deleteIndex
            }
        }

    },

    //清空播放列表
    clearSongList(state) {
        state.songList = []
    },

    //设置更新当前时间
    setCurrentTime(state, currentTime) {
        state.currentTime = currentTime
    },

    //加载图片
    setIsLoad(state, values) {
        state.isLoad = values
        console.log(values);
    },

    //重置当前播放音乐
    resetCurrentSongInfo(state) {
        state.currentSongInfo = {
            url: '',
            id: '',
            name: '',
            album: '',
            singer: '',
            pic: '',
            totleTime: 0,
            lyric: ''
        }
    },

    //设置当前歌曲下标
    setCurrentIndex(state, currentIndex) {
        state.currentIndex = currentIndex
    },

    findCorrectUrl(state) {
        //拿到现在需要播放的歌曲的id
        // state.currentSongInfo.id
        //拿到这个id 根据这个id 去SongListAllUrls里面找对应id的url 再返回赋值给currentSongInfo
        for (let j = 0; j < state.SongListAllUrls.length; j++) {
            if (state.SongListAllUrls.data.data[j].id == state.currentSongInfo.id) {
                state.currentSongInfo.url = state.SongListAllUrls.data.data[j].url;
                return
            }
        }
    },

    //刷新用户的歌单
    updataSonglist(state){
        state.heartSonglist=state.userSonglistInfo.data.playlist[0]
        state.mySonglist=[]
        state.collectSonglist=[]
      for(let i = 1 ;i<state.userSonglistInfo.data.playlist.length;i++){
        if(!state.userSonglistInfo.data.playlist[i].subscribed){
            state.mySonglist.push(state.userSonglistInfo.data.playlist[i])
        }else{
            state.collectSonglist.push(state.userSonglistInfo.data.playlist[i])
        }
      }
    },
    //用户的全部的歌单信息
    setUserSonglistInfo(state, userSonglistInfo) {
        state.userSonglistInfo = userSonglistInfo
    },

    setSongListDetailInfo(state, songListDetailInfo) {
        state.songListDetailInfo = songListDetailInfo
    },

}