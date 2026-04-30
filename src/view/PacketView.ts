/**
 * ============================================
 * 红包弹窗视图 - PacketView
 * ============================================
 * 继承自 UI 配置文件生成的 PacketUI 类
 * 用于显示游戏结果弹窗（抓到/未抓到）
 * 包含关闭按钮功能
 */

class PacketView extends ui.PacketUI {
    /**
     * 构造函数 - 初始化红包弹窗
     */
    constructor() {
        super();
        // 为关闭按钮绑定点击事件
        // 当用户点击关闭按钮时，调用 closeSelf 方法关闭弹窗
        this.closeBtn.on(Laya.Event.CLICK, this, this.closeSelf);
    }

    /**
     * 关闭弹窗方法
     * @protected
     */
    protected closeSelf(): void {
        // 调用父类的 close 方法关闭当前弹窗
        this.close();
    }
}
