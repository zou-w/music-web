# music-web

# 需要引用依赖

- normalize.css 初始化css
- redux状态管理
- immutable性能优化
- redux-immutable在redux时进行性能优化
- redux-thunk异步action请求
- axios请求
- antd组件
- craco运行依赖
- react-router路由管理
- react-router-config路由配置管理

## 1.redux开发应用

### 1.总redux

- **store/index.js**

  ```js
  //使用中间键:addlyMiddleware
  //使用异步action:redux-thunk
  
  import { applyMiddleware, compose, createStore } from "redux";
  
  import thunk from "redux-thunk";
  import reducer from "./reducer";
  
  //使用redux扩展,在开发者工具面板中检测redux
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  
  export default store;
  ```

- **store/reducer.js**

  ```js
  //合并reducer
  //优化性能:使用immutable
  //redux-immutable中含有combineReducer,与redux中一致,优化性能后的使用
  
  import { combineReducers } from "redux-immutable";
  
  //引入单页面的reducer
  import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";
  
  const cReducer = combineReducers({
    recommend: recommendReducer,
  });
  
  export default cReducer;
  ```

### 2.单页面redux

- **store/index.js**

  ```js
  //引入单页面reducer
  import reducer from "./reducer";
  
  //导出给总reducer
  export { reducer };
  ```

- **store/actionCreaters.js**

  ```js
  import * as actionTypes from "./constants";
  
  import { getTopBanners } from "@/services/recommend";
  
  const changeTopBannerAction = (res) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners,
  });
  
  export const getTopBannerAction = () => {
    return (dispatch) => {
      getTopBanners().then((res) => {
        dispatch(changeTopBannerAction(res));
      });
    };
  };
  ```

- **store/constans.js**

  ```js
  //导出常量
  export const CHANGE_TOP_BANNERS = "recommend/CHANGE_TOP_BANNERS";
  ```

- **store/reducer.js**

  ```js
  //immutable进行性能优化需要使用Map,生成二叉树,进行性能优化
  import { Map } from "immutable";
  
  import * as actionTypes from "./constants";
  
  const defaultState = Map({
    topBanners: [],
  });
  
  function reducer(state = defaultState, action) {
    switch (action.type) {
      case actionTypes.CHANGE_TOP_BANNERS:
        return state.set("topBanners", action.topBanners);
      default:
        return state;
    }
  }
  
  export default reducer;
  ```

  ## 2.redux使用流程

  **总reducer:**

  1. store/index.js文件

     ```js
     //引入需要用的组件
     import {createStore} from "redux"
     
     //创建store
     //如果不适用其他中间组件,则只需要在两个参数中,写一个参数reducer
     const store = createStore(reducer)
     
     export default store
     ```

  2. store/reducer.js文件

     ```js
     import { combineReducers } from "redux-immutable";
     
     import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";
     
     //合并reducer
     //如果不合并reduecer,则在reducer中写逻辑
     const cReducer = combineReducers({
       recommend: recommendReducer,
     });
     
     export default cReducer;
     
     ```

  **单reducer:**

  1. store/index.js文件

     ```js
     //引入reducer
     import reducer from "./reducer"
     
     //导出reducer
     export {reducer}
     ```

  2. store/actionCreaters.js文件

     ```js
     //写需要进行操作的action类型,类容
     //发送网络请求
     
     //导入constants文件中的变量
     import * as actionTypes from "./constants.js"
     //导入发送网络请求的函数
     import {getTopBanners} from "@/services/recommend.js"
     
     //定义action
     const changeTopBannerAction = (res) => ({
         type:actionTypes.CHANGE_TOP_BANNERS,
         topBanners:res.banners
     })
     
     //导出getTopBannerAction用来分发上面定义的action
     export const getTopBannerAction = () =>{
         return (dispatch) =>{
             getTopBanners().then((res)=>{
                 dispatch(changeTopBannerAction(res))
     		})
         }
     }
     ```

     - services/recommend.js

       ```js
       import request from "./request"
       
       //单个导出请求函数
       export function getTopBanners(){
           return request({
               url:"/banners"
           })
       }
       ```

  3. store/constants.js文件

     ```js
     export const CHANGE_TOP_BANNERS = "recommend/CHANGE_TOP_BANNERS";
     ```

  4. store/reducer.js文件

     ```js
     //引入constants文件中的变量
     import * as actionTypes from "./constants"
     
     //定义默认状态
     const defaultState = {
         topBanners: [],
     }
     
     //编写更改状态的类型,更新状态
     //action传过来两个参数,一个action中的state,一个action的type
     function reducer(state = defaultState,action){
         switch(action.type){
             case actionTypes.CHANGE_TOP_BANNERS:
                 return (...state,topBanners:action.topBanners)
             default:
                 return state
         }
     }
     
     //导出reducer
     export default reducer
     ```

  5. 组件中使用:top-banner/index.js

     ```js
     //使用两个hook,useDispatch和useSelector
     
     //获取状态
     const {topBanners} = useSelector((state)=>({
         //汇总后,会区分不同state中的reducer
         topBanners:state.recommend.topBanners
     }),shallowEqual)
     //发送请求
     useEffect(() => {
         //分发一个action
         dispatch(getTopBannerAction());
       }, [dispatch]);
     ```

     组件中获取状态,分发action

     actionCreater中调用导出的action(里面进行操作,

     ​						拿到一个res,将res传递给另外一个action函数),带参数res

     ​						再调用返回的action函数(res对状态进行保存)到reducer(携带state和type)

     reducer中根据获取的action的type,更新状态
     
     需要引入constants文件,actionCreaters.js和reducer.js文件
     
     



```js
//redux使用流程

//store/constants.js文件
export default CHANGE_TOP_BANNERS = "recommend/CHANGE_TOP_BANNERS"

//store/index.js
import reducer from "./reducer"

const store = createrStore(reducer)

export default store
//store/actionCreaters.js文件
import * as actionType from "./constants"
import {getBanners} from "@/services/recommend"

	//定义一个action
	//返回的是一个对象
const changeBannersAction = (res)=>({
    type:actionType.CHANGE_TOP_BANNERS,
    topBanner:res.recommend.topBanner
})

	//导出一个action对象
export const getTopBannersAction = () =>{
    return (dispatch) =>{
        getBanners().then((res)=>{
            dispatch(changeBannersAction(res))
        })
    }
}


//store/reducer.js文件
import * as actionType from "./constants"

	//定义初始化状态
const defaultState = {
    topBannners:[]
}

function reducer(state = defaultState,action){
    switch(action.type){
        case actionType.CHANGE_TOP_BANNERS:
            return(...state,topBanners:action.topBanner)
	}
}

//组件中使用

useSelector((state)=>{
    topBanners:state.recommend.topBanners
},[shallowEqual])

//发请求
const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getTopBannersAction())
},[dispatch])
```



## 3.正则表达式

```js
 / 规则 /

```

