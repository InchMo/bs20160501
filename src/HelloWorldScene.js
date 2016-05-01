/*
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

*/


var HelloWorldLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        cc.audioEngine.playMusic(res.s_Backgroundmusic, true); 
        cc.spriteFrameCache.addSpriteFrames(res.s_Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.s_Button_plist); 

        var winSize = cc.director.getWinSize(); 

        var pCloseItem = new cc.MenuItemImage(res.s_CloseNormal,res.s_CloseSelected, 
            res.s_CloseSelected, this.menuCloseCallback,this);
        pCloseItem.setPosition(winSize.width - 20, winSize.height - 20);

        var pMenu = new cc.Menu(pCloseItem);
        pMenu.setPosition(0, 0);
        this.addChild(pMenu, 1);

        var pLabel = new cc.LabelTTF("节奏大师", "Arial", 40);
        pLabel.setPosition(winSize.width / 2, winSize.height - pLabel.height - 15);
        this.addChild(pLabel, 1);

        var pSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg2.png"));
        pSprite.setScale(2);
        pSprite.setPosition(cc.p(winSize.width/2, winSize.height/2));
        this.addChild(pSprite, 0);

        var m_emitter = cc.ParticleFireworks.create();
        m_emitter.retain();
        pSprite.addChild(m_emitter, 10);

        //var abc = cc.textureCache().create();
        //pSprite.setTexture(); 
        //m_emitter.setPosition(ccp(winSize.width / 2, winSize.height / 2));

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
        

        return true;
    },
    menuCloseCallback:function(){
        //cc.director.end();
        console.log("-menuCloseCallback-");
    },
    toGameLayer:function() {
        // body...
        console.log("-toGameLayer-");
        cc.audioEngine.playMusic(res.s_ModeSelect02,false);
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
-------------------------------------------------------------------------------
   //plist+png
cc.spriteFrameCache.addSpriteFrames(s_Score_plist);
    var b = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("A.png"));
    b.setPosition(cc.p(winSize.width/3, 160));
    this.addChild(b);



--------------------------------------------------------------------------------
  //event
 ctor:function(){
    this._super();
    var winSize = cc.director.getWinSize();
    
    this.background = new cc.LayerColor(cc.color(128, 128, 128, 255),winSize.width,winSize.height);
    this.addChild(this.background);

    this.sprite = new cc.Sprite(s_HelloWorld);
    this.sprite.setPosition(winSize.width/2, winSize.height/2);
    this.addChild(this.sprite);

    this.label = new cc.LabelTTF("hello world","hello",40);
    this.label.setPosition(winSize.width/2, winSize.height - 80);
    this.addChild(this.label);

    

    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
               window.alert("successfull!");        
        }  //实现 onTouchBegan 事件回调函数
    });

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
            var target = event.getCurrentTarget();  // 获取事件所绑定的 target
            var locationInNode = target.convertToNodeSpace(touch.getLocation());  //相对于target左下解的坐标（x,y）
            var s = target.getContentSize();
            var rect = cc.rect(0, 20, s.width, s.height-20);
            if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
                window.alert("this is a label..");
                return true;
            }
            return false;     
        }  //实现 onTouchBegan 事件回调函数
    });

    cc.eventManager.addListener(listener,this.sprite);
    cc.eventManager.addListener(listener1,this.label);

    }

-----------------------------------------------------------------
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




    
    
   // this.background = new cc.LayerColor(cc.color(128, 128, 128, 255),winSize.width,winSize.height);
   // this.addChild(this.background);

    //cc.spriteFrameCache.addSpriteFrames(s_Score_plist);
    //var b = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("B.png"));
    //b.setPosition(cc.p(winSize.width/3, 160));
    //this.addChild(b);

    //var button1 = cc.spriteFrameCache.getSpriteFrame("A.png");
    /* button1 = new cc.Sprite(s_Button);
    button1.setScale(0.3);
    button1.setPosition(winSize.width/4, 60); 
    this.addChild(button1);

    var button2 = new cc.Sprite(s_Button);
    button2.setScale(0.3);
    button2.setPosition( winSize.width/2, 60);
    this.addChild(button2);

    var button3 = new cc.Sprite(s_Button);
    button3.setScale(0.3);
    button3.setPosition(winSize.width*3/4, 60);
    this.addChild(button3);

    var listenerButton1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
            var target = event.getCurrentTarget();  // 获取事件所绑定的 target
            var locationInNode = target.convertToNodeSpace(touch.getLocation());  //相对于target左下解的坐标（x,y）
           // var locationInNode1 = target.convertToNodeSpace({x:npc1.x, y:npc1.y});
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
               // if(cc.rectContainsPoint(rect,locationInNode1))
               // npc1.removeFromParent(true);
                label.string='button1';
                return true;
            }
            return false;     
        },


    });

    var listenerButton2 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
            var target = event.getCurrentTarget();  // 获取事件所绑定的 target
            var locationInNode = target.convertToNodeSpace(touch.getLocation());  //相对于target左下解的坐标（x,y）
            var s = target.getContentSize();
            var rect = cc.rect(0, 20, s.width, s.height-20);
            if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
                label.string="button2";
                return true;
            }
            return false;     
        },


    });


    var listenerButton3 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
            var target = event.getCurrentTarget();  // 获取事件所绑定的 target
            var locationInNode = target.convertToNodeSpace(touch.getLocation());  //相对于target左下解的坐标（x,y）
            var s = target.getContentSize();
            var rect = cc.rect(0, 20, s.width, s.height-20);
            if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
                
                //x=x/100;
                label.string="button3";
                return true;
            }
            return false;     
        },


    });

    cc.eventManager.addListener(listenerButton1, button1);
    cc.eventManager.addListener(listenerButton2, button2);
    cc.eventManager.addListener(listenerButton3, button3);  

    //x.addSpriteFrame("score.plist", "score.png");
    this.schedule(this.addNpc,2);  
    },

    addNpc:function(){

        for(var n in this.npc) {
          if(this.npc[n]!=null&&this.npc[n].y<30) {
            this.npc[n].removeFromParent(true); 
            //window.alert(this.npc[n].y);
          }
            
        }

        var target = cc.Sprite.create(s_Npc);
        target.setScale(0.2);
        var x=Math.random();
                x=x*100;
                x=(Math.floor(x))%3+1;
                //x=x%3+1;
        target.setPosition(cc.p(x*120, 800));
        if(x==1){
            if(this.npc["npc1_1"]==null)
                this.npc["npc1_1"]=target;
            else if (this.npc["npc1_2"]==null)
                this.npc["npc1_2"]=target;
            else if (this.npc["npc1_3"]==null)
                this.npc["npc1_3"]=target;
        }
        if(x==2){
            if(this.npc["npc2_1"]==null)
                this.npc["npc2_1"]=target;
            else if (this.npc["npc2_2"]==null)
                this.npc["npc2_2"]=target;
            else if (this.npc["npc2_3"]==null)
                this.npc["npc2_3"]=target;
        }
        if(x==3){
            if(this.npc["npc3_1"]==null)
                this.npc["npc3_1"]=target;
            else if (this.npc["npc3_2"]==null)
                this.npc["npc3_2"]=target;
            else if (this.npc["npc3_3"]==null)
                this.npc["npc3_3"]=target;
        }
        var actionTo = cc.moveTo(3, cc.p(target.x, 10));
        target.runAction(actionTo); 
        this.addChild(target);  
        */              
