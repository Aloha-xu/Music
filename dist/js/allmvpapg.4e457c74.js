(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["allmvpapg"],{"0d4d":function(t,e,r){"use strict";r("8e2e")},"1d8e":function(t,e,r){"use strict";r("8bed")},2780:function(t,e,r){},"408a":function(t,e,r){var i=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=i(t))throw TypeError("Incorrect invocation");return+t}},"6e41":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"all-mv-papg"},[r("div",{staticClass:"content"},[r("div",{staticClass:"title"},[t._v("全部MV")]),r("div",{staticClass:"select-bar"},[r("div",{staticClass:"left"},[t._v("地区：")]),r("div",{staticClass:"right"},t._l(t.selectBarInfo[0].area,(function(e){return r("div",{key:e,class:t.currentArea===e?"active":"",on:{click:function(r){return t.handleclickArea(e)}}},[t._v(" "+t._s(e)+" ")])})),0)]),r("div",{staticClass:"select-bar"},[r("div",{staticClass:"left"},[t._v("类型：")]),r("div",{staticClass:"right"},t._l(t.selectBarInfo[1].type,(function(e){return r("div",{key:e,class:t.currentType===e?"active":"",on:{click:function(r){return t.handleClickType(e)}}},[t._v(" "+t._s(e)+" ")])})),0)]),r("div",{staticClass:"select-bar"},[r("div",{staticClass:"left"},[t._v("排序：")]),r("div",{staticClass:"right"},t._l(t.selectBarInfo[2].order,(function(e){return r("div",{key:e,class:t.currentOrder===e?"active":"",on:{click:function(r){return t.handleClickOrder(e)}}},[t._v(" "+t._s(e)+" ")])})),0)]),r("div",{directives:[{name:"show",rawName:"v-show",value:!this.$store.state.loading,expression:"!this.$store.state.loading"}],staticClass:"card"},t._l(t.mvInfo,(function(t){return r("mv-card",{key:t.id,staticClass:"item",attrs:{id:t.id,pic:t.cover,playcount:t.playCount,singer:t.artists.map((function(t){var e=t.name;return e})),text:t.name}})})),1),r("Loading",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.loading,expression:"this.$store.state.loading"}],staticStyle:{height:"50vh"}})],1)])},n=[],a=(r("96cf"),r("1da1")),s=r("8182"),c=r("8137"),o=r("bf93"),l={name:"AllMvPapg",components:{MvCard:s["a"],Loading:o["a"]},data:function(){return{selectBarInfo:{0:{area:["全部","内地","港台","欧美","日本","韩国"]},1:{type:["全部","官方版","原生","现场版","网易出品"]},2:{order:["上升最快","最热","最新"]}},currentArea:"全部",currentType:"全部",currentOrder:"上升最快",mvInfo:[]}},methods:{handleclickArea:function(t){this.currentArea=t,this.getAllMvInfo()},handleClickType:function(t){this.currentType=t,this.getAllMvInfo()},handleClickOrder:function(t){this.currentOrder=t,this.getAllMvInfo()},getAllMvInfo:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.commit("setLoading",!0),e.next=3,Object(c["g"])(t.currentArea,t.currentType,t.currentOrder,60,0);case 3:r=e.sent,i=r.data,t.mvInfo=i.data,t.$store.commit("setLoading",!1);case 7:case"end":return e.stop()}}),e)})))()}},activated:function(){console.log("我是再次返回执行的activated钩子函数"),this.$route.query.area&&(this.currentArea=this.$route.query.area),this.$route.query.type&&(this.currentArea="全部",this.currentOrder="最新",this.currentType=this.$route.query.type),this.$route.query.order&&(this.currentArea="全部",this.currentType="全部",this.currentOrder=this.$route.query.order),this.getAllMvInfo()}},u=l,d=(r("1d8e"),r("2877")),v=Object(d["a"])(u,i,n,!1,null,"ae44faec",null);e["default"]=v.exports},8182:function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card",on:{click:t.clickCard}},[r("div",{staticClass:"pic"},[r("el-image",{attrs:{src:t.pic,lazy:""}}),r("span",{staticClass:"palycount"},[t._v(t._s(t.playCount))])],1),r("div",{staticClass:"text"},[t._v(" "+t._s(t.text)+" ")]),r("div",{staticClass:"singer"},t._l(t.singer,(function(e,i){return r("span",{key:i},[t._v(" "+t._s(e)+" ")])})),0)])},n=[],a=(r("a9e3"),r("b680"),{name:"MvCard",props:{pic:String,playcount:Number,text:String,id:String,singer:Array,playType:String},data:function(){return{activeColor:"red"}},computed:{playCount:function(){var t;return t=parseInt((this.playcount/1e4).toFixed(0))<=1?this.playcount:parseInt((this.playcount/1e4).toFixed(0))+"万",t}},methods:{clickCard:function(){"video"==this.playType?this.$router.push("/mvdetail/"+this.id):this.$router.push("/mvdetail/"+Number(this.id))}}}),s=a,c=(r("0d4d"),r("2877")),o=Object(c["a"])(s,i,n,!1,null,"0563c200",null);e["a"]=o.exports},"8bed":function(t,e,r){},"8e2e":function(t,e,r){},b2c9:function(t,e,r){"use strict";r("2780")},b680:function(t,e,r){"use strict";var i=r("23e7"),n=r("a691"),a=r("408a"),s=r("1148"),c=r("d039"),o=1..toFixed,l=Math.floor,u=function(t,e,r){return 0===e?r:e%2===1?u(t,e-1,r*t):u(t*t,e/2,r)},d=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},v=o&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){o.call({})}));i({target:"Number",proto:!0,forced:v},{toFixed:function(t){var e,r,i,c,o=a(this),v=n(t),f=[0,0,0,0,0,0],h="",p="0",g=function(t,e){var r=-1,i=e;while(++r<6)i+=t*f[r],f[r]=i%1e7,i=l(i/1e7)},m=function(t){var e=6,r=0;while(--e>=0)r+=f[e],f[e]=l(r/t),r=r%t*1e7},y=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==f[t]){var r=String(f[t]);e=""===e?r:e+s.call("0",7-r.length)+r}return e};if(v<0||v>20)throw RangeError("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return String(o);if(o<0&&(h="-",o=-o),o>1e-21)if(e=d(o*u(2,69,1))-69,r=e<0?o*u(2,-e,1):o/u(2,e,1),r*=4503599627370496,e=52-e,e>0){g(0,r),i=v;while(i>=7)g(1e7,0),i-=7;g(u(10,i,1),0),i=e-1;while(i>=23)m(1<<23),i-=23;m(1<<i),g(1,1),m(2),p=y()}else g(0,r),g(1<<-e,0),p=y()+s.call("0",v);return v>0?(c=p.length,p=h+(c<=v?"0."+s.call("0",v-c)+p:p.slice(0,c-v)+"."+p.slice(c-v))):p=h+p,p}})},bf93:function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"icon-loading"},[r("i",{staticClass:"el-icon-loading"}),r("span",[t._v("加载中")])])}],a={name:"Loading"},s=a,c=(r("b2c9"),r("2877")),o=Object(c["a"])(s,i,n,!1,null,"53e88a8c",null);e["a"]=o.exports}}]);