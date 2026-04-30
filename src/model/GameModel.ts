/**
 * ============================================
 * 游戏模型 - GameModel
 * ============================================
 * 游戏核心逻辑控制器
 * 负责：
 * 1. 娃娃的生成和移动动画
 * 2. 手臂的下降和抓取动画
 * 3. 碰撞检测（手臂与娃娃）
 * 4. 游戏结果判定和弹窗显示
 */

class GameModel {
    // ==========================================
    // 属性定义
    // ==========================================
    public resArray: Array<any>;        // 猴子布偶精灵数组
    public handBox: Laya.Box;           // 手臂容器
    protected rope: Laya.Image;         // 手臂绳索
    protected dollPos: any;             // 猴子布偶当前坐标
    protected handPos: any = { x: 0, y: 0 };  // 手臂当前坐标

    /**
     * 构造函数 - 初始化游戏
     */
    constructor() {
        // 创建布偶，开始游戏循环
        this.dollRun();
    }

    /**
     * 猴子布偶动画 - 创建娃娃并开始移动
     * @public
     */
    public dollRun(): void {
        // 实例化娃娃模型
        let doll: DollModel = new DollModel();
        // 创建娃娃精灵数组
        this.resArray = doll.create();
        // 启动定时器，每50毫秒移动一次娃娃
        Laya.timer.loop(50, this, this.moveTo);
    }

    /**
     * 手臂动画 - 响应开始按钮
     * @public
     * @param {any} obj - 游戏视图对象
     * @returns {any}
     */
    public handRun(obj: any): any {
        // 实例化手臂模型
        let hand: HandModel = new HandModel();
        // 获取手臂相关对象
        let res: Array<any> = hand.run(obj);
        this.handBox = res[0];  // 手臂容器
        this.rope = res[1];     // 绳索
        // 启动定时器，每100毫秒移动一次手臂
        Laya.timer.loop(100, this, this.handMove);
    }

    /**
     * 对猴子布偶进行移动 - 主要游戏循环
     * 检测碰撞、判定抓取结果
     * @protected
     * @param {Array<any>} resArray - 娃娃精灵数组
     * @returns {any}
     */
    protected moveTo(resArray: Array<any>): any {
        // 检测娃娃是否到达屏幕左边缘（移出屏幕）
        if (this.resArray[0].x <= -500) {
            // 清除移动定时器
            Laya.timer.clear(this, this.moveTo);
            // 移除所有娃娃精灵
            this.resArray.forEach(function (vv) {
                Laya.stage.removeChild(vv);
            });
            // 重新创建新的娃娃
            this.dollRun();
        }

        let _this: any = this;
        // 遍历所有娃娃精灵进行移动
        this.resArray.forEach(function (v) {
            // 记录娃娃当前位置
            _this.dollPos = { x: v.x, y: v.y };

            // 检测手臂是否到达底部（抓取区域）
            // 445是娃娃所在的大致Y坐标，±20是容错范围
            if (_this.handPos.y < (445 + 20) && _this.handPos.y > (445 - 20)) {
                // 检测娃娃是否在手臂抓取范围内
                // -200是手臂所在的大致X坐标，±50是抓取范围
                if (_this.dollPos.x < (-200 + 50) && _this.dollPos.x > (-200 - 50)) {
                    // ==========================================
                    // 抓取成功！
                    // ==========================================
                    _this.collision();  // 播放抓取动画

                    // 手臂向上移动（带动娃娃）
                    Laya.Tween.to(_this.handBox, { y: 40 }, 2000, Laya.Ease.elasticOut, null, 100);
                    Laya.Tween.to(_this.rope, { height: 20 }, 2000, Laya.Ease.elasticOut, null, 100);

                    // 娃娃跟随手臂向上移动
                    _this.resArray.forEach(function (vv) {
                        // 先向上移动
                        Laya.Tween.to(vv, { y: -(_this.handBox.y - 100) }, 1000, Laya.Ease.elasticOut, null, 100);
                        // 再向下掉落
                        Laya.Tween.to(vv, { y: _this.handBox.y }, 1000, Laya.Ease.elasticOut, null, 500);
                        // 禁用娃娃交互
                        vv.disabled = true;
                    });

                    // 清除娃娃移动定时器
                    Laya.timer.clear(_this, _this.moveTo);
                    // 重置手臂位置
                    _this.handPos.y = 40;

                    // 3秒后移除娃娃并重新生成
                    setTimeout(function () {
                        _this.resArray.forEach(function (vv) {
                            Laya.stage.removeChild(vv);
                        });
                        _this.dollRun();
                    }, 3000);

                    // 显示成功弹窗
                    _this.dialog({ state: true, info: '抓到了一个' });

                } else {
                    // ==========================================
                    // 抓取失败 - 娃娃不在范围内
                    // ==========================================
                    // 手臂向上收回
                    Laya.Tween.to(_this.handBox, { y: 40 }, 2000, Laya.Ease.elasticOut, null, 100);
                    Laya.Tween.to(_this.rope, { height: 20 }, 2000, Laya.Ease.elasticOut, null, 100);
                    // 重置手臂位置
                    _this.handPos.y = 40;

                    // 显示失败弹窗
                    _this.dialog({ state: false, info: '很遗憾,未抓到' });
                }
            }
            // 娃娃向左移动（每帧10像素）
            v.x -= 10;
        });
    }

    /**
     * 对手臂进行向下移动 - 下降动画
     * @protected
     * @returns {any}
     */
    protected handMove(): any {
        // 检测手臂是否到达底部边界
        if (this.handBox.y >= 520) {
            // 清除手臂移动定时器
            Laya.timer.clear(this, this.handMove);
            return true;
        }

        // 记录手臂当前位置
        this.handPos = {
            x: this.handBox.x,
            y: this.handBox.y
        };

        // 手臂向下移动（每帧100像素）
        this.handBox.y += 100;
        // 绳索伸长（同步增加高度）
        this.rope.height += 100;
    }

    /**
     * 检测碰撞 - 播放手臂抓取动画
     * @protected
     * @returns {boolean}
     */
    protected collision(): boolean {
        // 获取左右抓手
        let handLeft: Laya.Image = this.handBox.getChildByName('left') as Laya.Image;
        let handRight: Laya.Image = this.handBox.getChildByName('right') as Laya.Image;

        // 张开手臂动画（向外倾斜）
        Laya.Tween.to(handLeft, { skewX: -40 }, 500, Laya.Ease.elasticOut, null, 0);
        Laya.Tween.to(handRight, { skewX: 40 }, 500, Laya.Ease.elasticOut, null, 0);

        // 合拢手臂动画（恢复原位）
        Laya.Tween.to(handLeft, { skewX: 0 }, 500, Laya.Ease.elasticOut, null, 500);
        Laya.Tween.to(handRight, { skewX: 0 }, 500, Laya.Ease.elasticOut, null, 500);

        return true;
    }

    /**
     * 弹出结果框 - 显示抓取结果
     * @protected
     * @param {any} args - 包含 state（成功/失败）和 info（提示信息）
     * @returns {any}
     */
    protected dialog(args: any): any {
        // 创建红包弹窗实例
        let dialog: PacketView = new PacketView();
        // 设置弹窗标题
        dialog.PacketTitle.text = args.info;
        // 如果失败，显示灰色效果
        if (!args.state) {
            dialog.gray = true;
        }
        // 显示弹窗（居中弹出）
        return dialog.popup(true);
    }
}
