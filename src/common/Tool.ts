/**
 * ============================================
 * 工具类 - Tool
 * ============================================
 * 提供游戏开发中常用的工具函数
 * 所有方法均为静态方法，可直接调用
 */

class Tool {
    /**
     * 构造函数
     */
    constructor() {
        // 工具类不需要实例化
    }

    /**
     * 生成随机整数
     * 获取 0 到 num 之间的随机整数（包含0和num）
     * 
     * @static
     * @param {number} num - 随机数上限（默认10）
     * @returns {number} 0到num之间的随机整数
     * @example
     * Tool.rand(4)  // 可能返回 0, 1, 2, 3, 4
     * Tool.rand()   // 可能返回 0 到 10
     */
    public static rand(num: number = 10): number {
        // 主要获取1到10的随机整数，取0的几率极小。
        // Math.ceil(Math.random()*10);

        // 主要获取0到10的随机整数，使用四舍五入
        return Math.round(Math.random() * num);
    }
}
