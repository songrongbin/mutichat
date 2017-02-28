/**
 *  客户端（目前只支持浏览器，将来会扩展到移动端）程序入口文件
 *  创建一个模块，并且命名为chatApp
 *  配置路由，实现单页应用(single page application)
 */
var chatApp = angular.module("chatApp", ['ngRoute']);

// 路由配置
chatApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/init.html',
        controller: 'InitCtrl'
    })
    .when('/init', {
        templateUrl: 'views/init.html',
        controller: 'InitCtrl'
    });
});