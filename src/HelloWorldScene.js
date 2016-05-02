var HelloWorldLayer = cc.Layer.extend({
    ctor:function(){
        this._super(); 
        cc.spriteFrameCache.addSpriteFrames(res.s_Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.s_Button_plist); 

        var winSize = cc.director.getWinSize(); 

        //var gameLogo = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jiezoudashilogo.png"));
        var gameLogo = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jiezoudashilogo.png"));
        gameLogo.setPosition(winSize.width / 2, winSize.height - 80);
        this.addChild(gameLogo, 1);

        var pSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg2.png"));
        pSprite.setScale(2);
        pSprite.setPosition(cc.p(winSize.width/2, winSize.height/2));
        this.addChild(pSprite, 0);

        var m_emitter = cc.ParticleFireworks.create();
        m_emitter.retain();
        pSprite.addChild(m_emitter, 10);

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
        
        cc.audioEngine.playMusic(res.s_Backgroundmusic, true);
        return true;
    },
    
    toGameLayer:function() {
        // body...
        cc.audioEngine.playEffect(res.s_ModeSelect02,false);
        cc.director.runScene(new Game4KeyScene());
    },

});

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

