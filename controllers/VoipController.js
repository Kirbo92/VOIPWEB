(function (){
    
    angular.module('app.controllers')

    .controller('VoipController', ['$timeout', '$rootScope', '$scope', function ($timeout, $rootScope, $scope) {
        
        $scope.receive = true;
        var session;
        var serverIP = '10.1.200.4';
        var localExtension = '351';
        var passExtension = 'password351';

        var config = {
            uri: localExtension + '@' + serverIP,
            wsServers: 'ws://'+ serverIP +':8088/ws',
            authorizationUser: localExtension,
            password: passExtension,
            hackIpInContact: true,
            hackViaTcp: true,
            hackWssInTransport: true,
            traceSip: true,
            register: true,
            autostart: true,
            rtcpMuxPolicy: "negotiate"
        };

        var ua = new SIP.UA(config);

        var options = {
            media: {
                constraints: {
                    audio: true,
                    video: false
                },
                render: {
                    remote: document.getElementById('localAudio'),
                    local: document.getElementById('localAudio')
                }
            }
        };

        $scope.call = function () {
            var numero = angular.element('input').val();
            session = ua.invite(numero, options);
        }

        $scope.hangup = function (session) {
            session.on('bye');
        }

        $scope.receive = function (session) {
            session.accept();
        }


        //UA escuchando eventos
        ua.on('invite', function (session) {
            console.log(session)
            alert('Te están llamando');
            $scope.receive = true;

            session.on('bye', function (session) {
                alert('Colgado con exito')
            })
        })

        

    }])
})();
