/**
 * �����ҷ����
 * ���ܣ�ʵ����Node��ľ�̬������
 * ʵ���˻��棬gzipѹ����
 * @ author Cheng Liufeng
 * @ date 2014/8/30
 */
// ���ö˿ں�
var PORT = 3000;
// ����ģ��
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
// �����ļ�
var mime = require('./mime').types;
var config = require('./config');
var chatServer = require('./utils/chat_server');
var server = http.createServer(function (req, res) {
    res.setHeader("Server", "Node/V8");
    // ��ȡ�ļ�·��
    var pathName = url.parse(req.url).pathname;
    if (pathName.slice(-1) === "/") {
        pathName = pathName + "index.html"; //Ĭ��ȡ��ǰĬ���µ�index.html
    }
    // ��ȫ������ʹ��Linux �� curl�������ʱ�����ڰ�ȫ������
    var realPath = path.join("client", path.normalize(pathName.replace(/\.\./g, "")));
    // ����ļ�·���Ƿ����
    path.exists(realPath, function (exists) {
        // ���ļ�������ʱ������� ���һ��404����
        if (!exists) {
            res.writeHead(404, "Not Found", {'Content-Type': 'text/plain'});
            res.write("The request url" + pathName + " is not found!");
            res.end();
        } else {   // ���ļ�����ʱ�Ĵ����߼�
            fs.stat(realPath, function (err, stat) {
                // ��ȡ�ļ���չ��
                var ext = path.extname(realPath);
                ext = ext ? ext.slice(1) : "unknown";
                var contentType = mime[ext] || "text/plain";
                // ���� Content-Type
                res.setHeader("Content-Type", contentType);
                var lastModified = stat.mtime.toUTCString();
                var ifModifiedSince = "If-Modified-Since".toLowerCase();
                res.setHeader("Last-Modified", lastModified);
                if (ext.match(config.Expires.fileMatch)) {
                    var expires = new Date();
                    expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                    res.setHeader("Expires", expires.toUTCString());
                    res.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
                }
                if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {
                    res.writeHead(304, "Not Modified");
                    res.end();
                } else {
                    // ʹ�����ķ�ʽȥ��ȡ�ļ�
                    var raw = fs.createReadStream(realPath);
                    var acceptEncoding = req.headers['accept-encoding'] || "";
                    var matched = ext.match(config.Compress.match);
                    if (matched && acceptEncoding.match(/\bgzip\b/)) {
                        res.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
                        raw.pipe(zlib.createGzip()).pipe(res);
                    } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                        res.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
                        raw.pipe(zlib.createDeflate()).pipe(res);
                    } else {
                        res.writeHead(200, "Ok");
                        raw.pipe(res);
                    }
                    //   fs.readFile(realPath, "binary", function(err, data) {
                    //   if(err) {
                    //    // file exists, but have some error while read
                    //    res.writeHead(500, {'Content-Type': 'text/plain'});
                    //    res.end(err);
                    //   } else {
                    //    // file exists, can success return
                    //    res.writeHead(200, {'Content-Type': contentType});
                    //    res.write(data, "binary");
                    //    res.end();
                    //   }
                    //   });
                }
            })
        }
    })
})
server.listen(PORT, function() {
    console.log("Server is listening on port " + PORT + "!");
});

chatServer.listen(server);