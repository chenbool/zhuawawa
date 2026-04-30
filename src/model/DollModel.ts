/**
 * ============================================
 * 娃娃模型 - DollModel
 * ============================================
 * 负责创建和管理游戏中的娃娃角色
 * 包括：脸型、云彩装饰、红包、布偶身体的组合创建
 * 每个娃娃由多个精灵(Sprite)组合而成
 */

class DollModel {
    // ==========================================
    // 属性定义
    // ==========================================
    protected face: number = 0;         // 脸型类型索引（0-4，共5种脸型）
    protected smoke: number = 0;        // 云彩类型索引（0-3，共4种云彩）
    protected packet: any = 0;          // 红包类型

    protected faceSP: Laya.Sprite;      // 脸部精灵
    protected smokeSP: Laya.Sprite;     // 云彩精灵
    protected packetSP: Laya.Sprite;    // 红包精灵
    protected dollSP: Laya.Sprite;      // 人偶身体精灵
    protected MoveX: number = 20;       // 每次移动的水平像素数

    /**
     * 构造函数 - 初始化娃娃模型
     */
    constructor() {
        this._init();
    }

    /**
     * 初始化方法 - 随机生成娃娃属性
     * @protected
     */
    protected _init(): void {
        // 生成随机脸型类型（0-4）
        this.face = Tool.rand(4);
        // 生成随机云彩类型（0-3）
        this.smoke = Tool.rand(3);
    }

    /**
     * 创建完整角色 - 组合所有部件
     * @public
     * @returns {Array<any>} 返回所有精灵的数组
     */
    public create(): Array<any> {
        // 依次创建各个部件
        this.createDoll();      // 布偶身体
        this.createFace();      // 脸部
        this.createPacket();    // 红包
        this.createSmoke();     // 云彩

        // 返回所有精灵，供游戏逻辑控制移动
        return [
            this.faceSP,
            this.smokeSP,
            this.packetSP,
            this.dollSP
        ];
    }

    /**
     * 创建布偶身体 - 娃娃的主体部分
     * @public
     */
    public createDoll(): void {
        this.dollSP = new Laya.Sprite();
        // 加载布偶图片，设置位置和尺寸
        // 参数：图片路径，x坐标，y坐标，宽度，高度
        this.dollSP.loadImage("ui/doll.png", 393, 578, 83, 89);
        // 将精灵添加到舞台显示
        Laya.stage.addChild(this.dollSP);
    }

    /**
     * 创建脸部 - 随机脸型
     * @public
     */
    public createFace(): void {
        this.faceSP = new Laya.Sprite();
        // 根据随机生成的 face 值加载对应的脸型图片
        // 图片命名格式：face_0.png ~ face_4.png
        this.faceSP.loadImage('ui/face_' + this.face + '.png', 415, 600, 44, 36);
        Laya.stage.addChild(this.faceSP);
    }

    /**
     * 创建红包 - 娃娃携带的红包
     * @public
     */
    public createPacket(): void {
        this.packetSP = new Laya.Sprite();
        this.packetSP.loadImage('ui/rand-packet.png', 420, 620, 36, 35);
        Laya.stage.addChild(this.packetSP);
    }

    /**
     * 创建云彩装饰 - 随机云彩样式
     * @public
     */
    public createSmoke(): void {
        // ui/smoke_2.png
        this.smokeSP = new Laya.Sprite();
        // 根据随机生成的 smoke 值加载对应的云彩图片
        // 图片命名格式：smoke_0.png ~ smoke_3.png
        this.smokeSP.loadImage('ui/smoke_' + this.smoke + '.png', 393, 650, 86, 65);
        Laya.stage.addChild(this.smokeSP);
    }
}
