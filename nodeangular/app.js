/**
 *  �ͻ��ˣ�Ŀǰֻ֧�����������������չ���ƶ��ˣ���������ļ�
 *  ����һ��ģ�飬��������ΪchatApp
 *  ����·�ɣ�ʵ�ֵ�ҳӦ��(single page application)
 */
var chatApp = angular.module("chatApp", ['ngRoute']);

// ·������
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