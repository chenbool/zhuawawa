/**
 * ============================================
 * 游戏初始化模块 - Init
 * ============================================
 * 负责游戏的初始化工作：
 * 1. 设置游戏画布尺寸
 * 2. 配置屏幕适配模式
 * 3. 加载游戏资源（图集、图片）
 * 4. 资源加载完成后启动游戏主界面
 */

class Init {

    /**
     * 构造函数 - 初始化 Laya 引擎
     */
    constructor() {
        // 初始化 Laya 游戏引擎，设置游戏画布尺寸为 480x800（竖屏）
        Laya.init(480, 800);
        // 调用初始化方法
        this.init();
    }

    /**
     * 初始化方法 - 配置舞台和加载资源
     * @private
     */
    private init(): void {
        // ==========================================
        // 屏幕适配配置
        // ==========================================
        // 精确适配模式：内容保持原始比例，可能产生黑边
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        // 水平居中显示
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        // 垂直居中显示
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        // 设置屏幕方向为竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;

        // ==========================================
        // 资源加载配置
        // ==========================================
        // 定义需要预加载的资源列表
        let resArray: Array<any> = [
            // 加载 UI 图集（包含所有 UI 图片的打包资源）
            { url: "res/atlas/ui.json", type: Laya.Loader.ATLAS },
            // 加载背景图片
            { url: "ui/bg-index_bd.jpg", type: Laya.Loader.IMAGE }
            // {url : "ui/packet-dialog.jpg", type : Laya.Loader.IMAGE }
        ];

        // 启动资源加载
        // 参数1：资源列表
        // 参数2：加载完成回调
        // 参数3：加载进度回调
        Laya.loader.load(
            resArray,
            Laya.Handler.create(this, this.onLoaded),
            Laya.Handler.create(this, this.onProgress)
        );
    }

    /**
     * 资源加载进度回调
     * @param value - 加载进度值（0-1）
     * @private
     */
    private onProgress(value: number): void {
        // 在控制台输出加载进度
        console.log("游戏加载进度: ", value);
    }

    /**
     * 资源加载完成回调 - 启动游戏主界面
     * @private
     */
    private onLoaded(): void {
        // 创建游戏主视图实例
        let game: GameView = new GameView();
        // 将游戏视图添加到舞台显示列表
        Laya.stage.addChild(game);
        // let gameModel = new GameModel();
    }

}
