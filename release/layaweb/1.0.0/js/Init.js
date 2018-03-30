var Init = (function () {
    function Init() {
        Laya.init(480, 800);
        this.init();
    }
    // 初始化
    Init.prototype.init = function () {
        //屏幕适配
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        // 加载(图片 和 图集)
        var resArray = [
            { url: "res/atlas/ui.json", type: Laya.Loader.ATLAS },
            { url: "ui/bg-index_bd.jpg", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onProgress));
    };
    //加载进度
    Init.prototype.onProgress = function (value) {
        console.log("游戏加载进度: ", value);
    };
    //加载完成 回调函数
    Init.prototype.onLoaded = function () {
        var game = new GameView();
        Laya.stage.addChild(game);
        // let gameModel = new GameModel();
    };
    return Init;
}());
//# sourceMappingURL=Init.js.map