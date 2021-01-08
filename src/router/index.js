import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/main/Index.vue'



Vue.use(VueRouter)

// 点击同一个路由不报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch(error => error)
};



const routes = [{
    path: '/',
    name: 'Index',
    component: Index
  },
  // 错误页面
  {
    name: 'error401',
    path: '/401',
    component: () => import('@/views/error/401')
  },
  {
    name: 'NotMatch',
    path: '*',
    meta: {
      noHeader: true,
      noFooter: true,
    },
    component: () => import('@/views/error/404')
  },
  {
    path: '/arDistancEducation',
    name: 'ArDistancEducation',
    component: () => import('@/views/main/ArDistancEducation')
  },
  {
    path: '/skill',
    name: 'Skill',
    component: () => import('@/views/main/Skill')
  },
  {
    path: '/college',
    name: 'College',
    component: () => import('@/views/main/College')
  },
  {
    path: '/college2',
    name: 'College2',
    component: () => import('@/views/main/College2')
  },
  {
    path: '/mediaInformation',
    name: 'MediaInformation',
    component: () => import('@/views/main/MediaInformation')
  },
  {
    path: '/talentsTransport',
    name: 'TalentsTransport',
    component: () => import('@/views/main/TalentsTransport')
  },
  {
    path: '/talentsTransportTrain',
    name: 'TalentsTransportTrain',
    component: () => import('@/views/main/TalentsTransportTrain')
  },
  {
    path: '/talentsTransportComp',
    name: 'TalentsTransportComp',
    component: () => import('@/views/main/TalentsTransportComp')
  },
  {
    path: '/mediaInformationDetail',
    name: 'MediaInformationDetail',
    component: () => import('@/views/main/MediaInformationDetail')
  },
  {
    path: '/publishJob',
    name: 'PublishJob',
    component: () => import('@/views/main/PublishJob')
  },
  {
    path: '/detailResume',
    name: 'DetailResume',
    component: () => import('@/views/main/DetailResume')
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/register')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login')
  },
  {
    path: '/forgotPass',
    name: 'ForgotPass',
    component: () => import('@/views/user/forgotPass')
  },




  // 个人中心
  // 学生
  {
    path: '/userSetting',
    name: 'UserSetting',
    component: () => import('@/views/center/student/userSetting')
  },
  {
    path: '/myCollection',
    name: 'MyCollection',
    component: () => import('@/views/center/student/myCollection')
  },
  {
    path: '/myDeliver',
    name: 'MyDeliver',
    component: () => import('@/views/center/student/myDeliver')
  },
  {
    path: '/myCourse',
    name: 'MyCourse',
    component: () => import('@/views/center/student/myCourse')
  },
  {
    path: '/myResult',
    name: 'MyResult',
    component: () => import('@/views/center/student/myResult')
  },
  // 企业
  {
    path: '/myCompany',
    name: 'MyCompany',
    component: () => import('@/views/center/company/myCompany'),
    children: [{
        path: 'setting', //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;
        name: 'Setting',
        meta: {
          fixPosition: true, // 跳转时页面不自动置顶
        },
        component: () => import('@/views/center/company/setting'),
      },
      {
        path: 'mema',
        name: 'Mema',
        meta: {
          fixPosition: true,
        },
        component: () => import('@/views/center/company/mema'),
      }
    ]
  },
  // 设备商
  {
    path: '/myMemaCompany',
    name: 'MyMemaCompany',
    component: () => import('@/views/center/memaCompany/myMemaCompany'),
    children: [{
        path: 'memaSetting', //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;
        name: 'MemaSetting',
        meta: {
          fixPosition: true, // 跳转时页面不自动置顶
        },
        component: () => import('@/views/center/memaCompany/memaSetting'),
      },
      {
        path: 'memaCooperate',
        name: 'MemaCooperate',
        meta: {
          fixPosition: true,
        },
        component: () => import('@/views/center/memaCompany/memaCooperate'),
      },
      {
        path: 'memaCourse',
        name: 'MemaCourse',
        meta: {
          fixPosition: true,
        },
        component: () => import('@/views/center/memaCompany/memaCourse'),
      },
      {
        path: 'memaBase',
        name: 'MemaBase',
        meta: {
          fixPosition: true,
        },
        component: () => import('@/views/center/memaCompany/memaBase'),
      },
      {
        path: 'memaTrain',
        name: 'MemaTrain',
        meta: {
          fixPosition: true,
        },
        component: () => import('@/views/center/memaCompany/memaTrain'),
      }
    ]
  },
  {
    path: '/addCooperator',
    name: 'AddCooperator',
    component: () => import('@/views/center/memaCompany/addCooperator'),
  },
  {
    path: '/detailCooperator',
    name: 'DetailCooperator',
    component: () => import('@/views/center/memaCompany/detailCooperator'),
  },
  // 后台管理
  // 公司
  {
    path: '/console/Company',
    name: 'ConsoleCompany',
    component: () => import('@/views/console/company/CompanyDefault'),
  },
  {
    path: '/console/UserManage',
    name: 'UserManage',
    component: () => import('@/views/console/company/UserManage'),
  },
  {
    path: '/console/MemaManage',
    name: 'MemaManage',
    component: () => import('@/views/console/company/MemaManage'),
  },
  {
    path: '/console/DeviceManage',
    name: 'DeviceManage',
    component: () => import('@/views/console/company/DeviceManage'),
  },
  {
    path: '/console/BaseManage',
    name: 'BaseManage',
    component: () => import('@/views/console/company/BaseManage'),
  },
  {
    path: '/console/addCooperator',
    name: 'ConsoleAddCooperator',
    component: () => import('@/views/console/company/addCooperator'),
  },
  {
    path: '/console/addUser',
    name: 'ConsoleAddUser',
    component: () => import('@/views/console/company/addUser'),
  },
  

  // 后台管理 学校
  {
    path: '/console/studentManage',
    name: 'ConsoleStudentManage',
    component: () => import('@/views/console/school/StudentManage'),
  },
  {
    path: '/console/professionManage',
    name: 'ConsoleProfessionManage',
    component: () => import('@/views/console/school/ProfessionManage'),
  },
  {
    path: '/console/courseManage',
    name: 'ConsoleCourseManage',
    component: () => import('@/views/console/school/CourseManage'),
  },
  {
    path: '/console/memaComManage',
    name: 'ConsoleMemaManage',
    component: () => import('@/views/console/school/MemaManage'),
  },
  {
    path: '/console/testManage',
    name: 'ConsoleTestManage',
    component: () => import('@/views/console/school/TestManage'),
  },
  {
    path: '/console/authenManage',
    name: 'ConsoleAuthenManage',
    component: () => import('@/views/console/school/AuthenManage'),
  },
  {
    path: '/console/addTest',
    name: 'ConsoleAddTest',
    component: () => import('@/views/console/school/addTest'),
  },
  {
    path: '/console/addProfession',
    name: 'ConsoleAddProfession',
    component: () => import('@/views/console/school/addProfession'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router