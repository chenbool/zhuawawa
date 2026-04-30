/**
 * ============================================
 * 游戏主视图 - GameView
 * ============================================
 * 继承自 UI 配置文件生成的 GameUI 类
 * 负责处理用户交互、按钮点击事件
 * 协调游戏模型（GameModel）执行游戏逻辑
 */

class GameView extends ui.GameUI {
    // 游戏模型实例，处理核心游戏逻辑
    public game: GameModel;

    /**
     * 构造函数 - 初始化游戏视图
     */
    constructor() {
        super();
        // 实例化游戏模型
        this.game = new GameModel();
        // 为"开始"按钮绑定点击事件
        // 当用户点击按钮时，调用 handRun 方法
        this.startBtn.on(Laya.Event.CLICK, this, this.handRun);
    }

    /**
     * 手臂动画触发方法 - 响应"开始"按钮点击
     * @protected
     * @returns {any}
     */
    protected handRun(): any {
        // 调用游戏模型的手臂动画方法，传入当前视图实例
        this.game.handRun(this);

        // 禁用开始按钮，防止重复点击
        this.startBtn.disabled = true;
        // 修改按钮文字为"稍等"，提示用户动画进行中
        this.startBtn.label = '稍等';

        // 保存当前上下文，供 setTimeout 回调使用
        let __this: any = this;

        // 2秒后恢复按钮状态
        setTimeout(function () {
            // 重新启用按钮
            __this.startBtn.disabled = false;
            // 恢复按钮文字为"开始"
            __this.startBtn.label = '开始';
        }, 2000);
    }

}
