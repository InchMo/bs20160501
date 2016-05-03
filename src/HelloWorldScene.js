var HelloWorldLayer = cc.Layer.extend({
    //层的构造函数 
    ctor:function(){
        //调用父类的构造函数 
        this._super();

        //加载plist文件
        cc.spriteFrameCache.addSpriteFrames(res.s_Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.s_Button_plist); 

        //获取界面尺寸
        var winSize = cc.director.getWinSize(); 

        //设置背景图片
        var pSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg2.png"));
        pSprite.setScale(2);
        pSprite.setPosition(cc.p(winSize.width/2, winSize.height/2));
        this.addChild(pSprite, 0);

        //设置“节奏大师”的logo
        var gameLogo = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jiezoudashilogo.png"));
        gameLogo.setPosition(winSize.width / 2, winSize.height - 80);
        this.addChild(gameLogo, 1);

        /*
        var m_emitter = cc.ParticleFireworks.create();
        m_emitter.initWithTotalParticles(10);
        m_emitter.retain();
        m_emitter.setPosition(winSize.width/2, winSize.height/2);
        pSprite.addChild(m_emitter, 10);
        */

        //设置游戏模式选项
        var key4SpriteButton = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("key_button_4.png"));
        var key5SpriteButton = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("key_button_5.png"));
        var key6SpriteButton = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("key_button_6.png"));

        var game4KeyMenu = cc.MenuItemSprite.create( key4SpriteButton, null, null, this.toGameLayer, this);
        var game5KeyMenu = cc.MenuItemSprite.create( key5SpriteButton, null, null, this.toGameLayer, this);
        var game6KeyMenu = cc.MenuItemSprite.create( key6SpriteButton, null, null, this.toGameLayer, this);

        var menu = new cc.Menu(game4KeyMenu, game5KeyMenu, game6KeyMenu, null);
        menu.alignItemsVerticallyWithPadding(100);
        menu.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(menu, 1);
        
        //播放背景音乐
        cc.audioEngine.playMusic(res.s_Backgroundmusic, true);
        return true;
    },
    
    toGameLayer:function() {
        // body...
        //播放音乐特效
        cc.audioEngine.playEffect(res.s_ModeSelect02,false);

        //切换至Game4Key场景 
        cc.director.runScene(new Game4KeyScene());
    },

});

//创建首页场景类
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


/* 
cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event){
                window.alert("Move..");
                // do something...
            },
            onMouseUp: function(event){
                window.alert("Up..");
                // do something...
            },
            onMouseDown: function(event){
               window.alert("Down..");
                // do something...
            },
        },this);
*/

