(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b939638"],{"1b50":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"find-music"},[n("NavBar"),n("div",{staticClass:"container"},[n("keep-alive",[n("router-view")],1)],1)],1)},s=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-bar"},t._l(t.findMusictype,(function(e,r){return n("div",{key:r,staticClass:"nav-bar-item",class:t.currentIndex===r?"active":"",on:{click:function(e){return t.itemClick(r)}}},[t._v(" "+t._s(e)+" ")])})),0)},c=[],a={name:"NavBar",data:function(){return{findMusictype:["推荐","歌单","主播电台","排行榜","歌手","最新音乐"]}},methods:{itemClick:function(t){switch(t){case 0:this.$router.push("/recommend");break;case 1:this.$router.push("/songlist");break;case 2:this.$router.push("/anchorradio");break;case 3:this.$router.push("/rank");break;case 4:this.$router.push("/singer");break;case 5:this.$router.push("/newmusic");break}this.$store.commit("refeshCurrentNavIndex",t)}},created:function(){this.itemClick(this.currentIndex)},computed:{currentIndex:function(){return this.$store.state.navCurrentIndex}}},u=a,o=(n("cbd0"),n("2877")),d=Object(o["a"])(u,i,c,!1,null,"433684f1",null),l=d.exports,h={name:"FindMusic",components:{NavBar:l}},b=h,f=(n("db07"),Object(o["a"])(b,r,s,!1,null,"9933538e",null));e["default"]=f.exports},"2b3b":function(t,e,n){},"6c68":function(t,e,n){},cbd0:function(t,e,n){"use strict";n("2b3b")},db07:function(t,e,n){"use strict";n("6c68")}}]);
//# sourceMappingURL=chunk-2b939638.9a09c7e0.js.map