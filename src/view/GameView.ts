class GameView extends ui.GameUI {
    public game:GameModel;

    constructor() {
        super();   
        this.game = new GameModel();
        this.startBtn.on(Laya.Event.CLICK,this,this.handRun);
    }

    // 手臂动画
    protected handRun():any{
        this.game.handRun( this );  
        this.startBtn.disabled = true; 
        this.startBtn.label = '稍等';
        let __this:any = this;
        setTimeout(function(){
            __this.startBtn.disabled = false;
            __this.startBtn.label = '开始';
        },2000);
    }

}