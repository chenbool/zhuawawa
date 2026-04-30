/**
 * ============================================
 * 手臂模型 - HandModel
 * ============================================
 * 负责管理抓娃娃的手臂（抓手）
 * 包括：手臂容器、绳索的引用管理
 * 主要用于初始化手臂相关对象的引用
 */

class HandModel {
    // ==========================================
    // 属性定义
    // ==========================================
    protected handBox: Laya.Box;    // 手臂容器（包含左右抓手）
    protected rope: Laya.Image;     // 手臂绳索（可伸缩的图片）

    /**
     * 构造函数
     */
    constructor() {
        // 构造函数为空，实际初始化在 run 方法中完成
    }

    /**
     * 运行手臂 - 初始化手臂对象引用
     * @public
     * @param {any} obj - 包含 handBox 和 rope 的对象（来自 GameUI）
     * @returns {Array<any>} 返回手臂相关对象的数组
     */
    public run(obj: any): any {
        // 从传入的对象中获取手臂容器
        this.handBox = obj.handBox;
        // 从传入的对象中获取绳索
        this.rope = obj.rope;

        // 返回手臂相关对象，供游戏逻辑使用
        return [
            this.handBox,   // 手臂容器
            this.rope,      // 绳索
            obj             // 原始对象
        ];
    }
}
