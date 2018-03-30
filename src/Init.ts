class Init {

    constructor() {
        Laya.init(480,800);
        this.init();
    }

    // 初始化
    private init():void{
        //屏幕适配
        Laya.stage.scaleMode    =   Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.alignH       =   Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV       =   Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode   =   Laya.Stage.SCREEN_VERTICAL;

        // 加载(图片 和 图集)
        let resArray:Array<any> = [
            {url : "res/atlas/ui.json", type : Laya.Loader.ATLAS },
            {url : "ui/bg-index_bd.jpg", type : Laya.Loader.IMAGE }
            // {url : "ui/packet-dialog.jpg", type : Laya.Loader.IMAGE }
        ] ;
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded),
        Laya.Handler.create(this, this.onProgress)) ;        
    }

    //加载进度
    private onProgress(value:number):void {
        console.log("游戏加载进度: ", value) ;
    }

    //加载完成 回调函数
    private onLoaded():void {
        let game:GameView = new GameView();
        Laya.stage.addChild(game);
        // let gameModel = new GameModel();
    }

}