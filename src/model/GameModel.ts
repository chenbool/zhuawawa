class GameModel {

    public resArray:Array<any>; //猴子布偶
    public handBox:Laya.Box;  //手臂  
    protected rope:Laya.Image;  //手臂绳索
    protected dollPos:any;      //猴子布偶坐标
    protected handPos:any={x:0,y:0};//手臂坐标 

    constructor() {   
        // 创建布偶
        this.dollRun();  
    }

    // 猴子布偶动画
    public dollRun():void{
        let doll:DollModel = new DollModel();
        this.resArray = doll.create();
        Laya.timer.loop(50,this,this.moveTo );
    }


    // 手臂动画
    public handRun(obj:any):any{
        let hand:HandModel = new HandModel();
        let res:Array<any> = hand.run( obj );
        this.handBox = res[0];
        this.rope = res[1];
        Laya.timer.loop(100,this,this.handMove );
        
    }

    // 对猴子布偶进行移动
    protected moveTo( resArray:Array<any> ):any{

        //检测是否到达屏幕边缘
        if( this.resArray[0].x <= -500 ){
            Laya.timer.clear(this,this.moveTo);   
            this.resArray.forEach(function(vv){
                Laya.stage.removeChild(vv);
            });
            this.dollRun();
        }

        let _this:any = this;
        // 移动
        this.resArray.forEach(function(v){      
            _this.dollPos = { x:v.x, y:v.y };
            // 检测手臂是否到达底部
            if( _this.handPos.y < (445+20) && _this.handPos.y > (445-20) ){  

                // console.log( '手臂y'+_this.handPos.y + '-- 布偶x: '+_this.dollPos.x );
                 //是否抓住了布偶   
                if( _this.dollPos.x < (-200+50) && _this.dollPos.x > (-200-50) ){
                    _this.collision();  //碰撞
                    Laya.Tween.to(_this.handBox, { y : 40 },2000, Laya.Ease.elasticOut, null, 100);
                    Laya.Tween.to(_this.rope, { height : 20 }, 2000, Laya.Ease.elasticOut, null, 100);
                    
                    //向上移动布偶
                    _this.resArray.forEach(function(vv){
                        Laya.Tween.to(vv, { y : -(_this.handBox.y-100) },1000, Laya.Ease.elasticOut, null, 100);
                        Laya.Tween.to(vv, { y : _this.handBox.y },1000, Laya.Ease.elasticOut, null, 500);
                        vv.disabled = true;
                    });

                    Laya.timer.clear(_this,_this.moveTo);
                    
                    _this.handPos.y = 40;
                   
                    // 移除精灵
                    setTimeout(function(){
                        _this.resArray.forEach(function(vv){
                            Laya.stage.removeChild(vv);
                        });
                        
                        _this.dollRun();
                    },3000);  

                    _this.dialog({state:true,info:'抓到了一个'});

                }else{
                    Laya.Tween.to(_this.handBox, { y : 40 },2000, Laya.Ease.elasticOut, null, 100);
                    Laya.Tween.to(_this.rope, { height : 20 }, 2000, Laya.Ease.elasticOut, null, 100); 
                    _this.handPos.y = 40; 

                    //弹窗
                    _this.dialog({state:false,info:'很遗憾,未抓到'} );
                }    
            }
            v.x -= 10;
        });

    }


    // 对手臂进行向下移动
    protected handMove():any{
        //检测是否到达屏幕边缘
        if( this.handBox.y >= 520 ){
            Laya.timer.clear(this,this.handMove);  
            return true;
        }

        this.handPos = {
            x:this.handBox.x,
            y:this.handBox.y
        };

        // 移动
        this.handBox.y += 100;
        this.rope.height += 100;       
    }

    //检测是否碰撞
    protected collision():boolean{
        let handLeft:Laya.Image = this.handBox.getChildByName('left') as Laya.Image;
        let handRight:Laya.Image = this.handBox.getChildByName('right') as Laya.Image;

        //张开手臂
        Laya.Tween.to(handLeft, { skewX : -40 }, 500, Laya.Ease.elasticOut, null, 0);
        Laya.Tween.to(handRight, { skewX : 40 }, 500, Laya.Ease.elasticOut, null, 0);
        // 合拢手臂
        Laya.Tween.to(handLeft, { skewX : 0 }, 500, Laya.Ease.elasticOut, null, 500);
        Laya.Tween.to(handRight, { skewX : 0 }, 500, Laya.Ease.elasticOut, null, 500);
        return true;
    }

    // 弹出框
    protected dialog(args:any):any{
        let dialog:PacketView = new PacketView();
        dialog.PacketTitle.text = args.info;
        if( !args.state ){
            dialog.gray = true;
        }
        return dialog.popup(true);        
    }


}