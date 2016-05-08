var HomeLayer = cc.Layer.extend({
    //层的构造函数 
    ctor:function(){
        //调用父类的构造函数 
        this._super();

        //选中的音乐
        this.selectMusic = null;

        //加载plist文件
        cc.spriteFrameCache.addSpriteFrames(res.s_Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.s_Button_plist); 

        //获取界面尺寸
        var winSize = cc.director.getWinSize(); 

        //设置背景图片
        var pSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg2.png"));
        pSprite.setScale(2);
        pSprite.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(pSprite, 0);

        //设置“节奏大师”的logo
        var gameLogo = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jiezoudashilogo.png"));
        gameLogo.setPosition(winSize.width / 2 , winSize.height - 80);
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

        var game4KeyMenu = cc.MenuItemSprite.create( key4SpriteButton, null, null, this.startGameCallBack, this);
        var game5KeyMenu = cc.MenuItemSprite.create( key5SpriteButton, null, null, this.startGameCallBack, this);
        var game6KeyMenu = cc.MenuItemSprite.create( key6SpriteButton, null, null, this.startGameCallBack, this);

        var menu = new cc.Menu(game4KeyMenu, game5KeyMenu, game6KeyMenu, null);
        menu.setPosition(winSize.width / 4, winSize.height / 2 - 50);
        menu.alignItemsVerticallyWithPadding(80);
        this.addChild(menu, 1);

        //
        this.label1 = cc.LabelTTF.create("已选歌曲：", "Arial", 40, null, null, null);
        this.label1.setPosition(winSize.width / 5, 40);
        this.addChild(this.label1);
        this.label2 = cc.LabelTTF.create("无", "Arial", 20, null, null, null);
        this.label2.setPosition(this.label1.x + 140 , this.label1.y);
        this.addChild(this.label2);

        var startGameItem = new cc.MenuItemImage(cc.spriteFrameCache.getSpriteFrame("start.png"), cc.spriteFrameCache.getSpriteFrame("pause_2.png"), 
            cc.spriteFrameCache.getSpriteFrame("start.png"), this.startGameCallBack,this);
        var startGameMenu = new cc.Menu(startGameItem);
        startGameMenu.setPosition(winSize.width / 5 * 4, 50);
        this.addChild(startGameMenu, 1);


        this._array = [];
        for (var i = 0; i < 20; ++i) {
            this._array.push("item_" + i);
        }
         // Create the list view
        this.listView = new ccui.ListView();
            // set list view ex direction
        this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listView.setTouchEnabled(true);
        this.listView.setBounceEnabled(true);
        //listView.setBackGroundImage(res.s_Andy_png);
        //listView.setBackGroundImageScale9Enabled(true);
        this.listView.setContentSize(cc.size(200, 300));
        this.listView.setAnchorPoint(0.5, 0.5);
        this.listView.x = winSize.width / 4 * 3;
        this.listView.y = winSize.height / 2 - 50 ;
        this.listView.addEventListener(this.listViewCallBack, this);
        this.addChild(this.listView, 10);

            // create model
        var default_button = new ccui.Button();
        default_button.setName("TextButton");
        default_button.setTouchEnabled(true);
        default_button.loadTextures(res.s_ItemBg1_png, res.s_ItemBg2_png, res.s_ItemBg2_png);
        default_button.setContentSize(cc.size(100, 30));
        /*
        var default_item = new ccui.Layout();
        default_item.setTouchEnabled(true);
        default_item.setContentSize(default_button.getContentSize());
        default_item.width = listView.width;
        default_button.x = default_item.width / 2;
        default_button.y = default_item.height / 2;
        default_item.addChild(default_button);
        
            // set model
        listView.setItemModel(default_item);
        */
            // add default item
        var count = this._array.length;
        /*for (var i = 0; i < count / 4; ++i) {
                listView.pushBackDefaultItem();
        }
            // insert default item
        for (var i = 0; i < count / 4; ++i) {
                listView.insertDefaultItem(0);
        }
        */
            // add custom item
        for (var i = 0; i < count / 4; ++i) {
            var custom_button = new ccui.Button();
            custom_button.setName("TextButton");
            custom_button.setTouchEnabled(true);
            custom_button.setScale9Enabled(true);
            custom_button.loadTextures(res.s_ItemBg1_png, res.s_ItemBg2_png, res.s_ItemBg2_png);
            custom_button.setContentSize(default_button.getContentSize());

            var custom_item = new ccui.Layout();
            custom_item.setContentSize(custom_button.getContentSize());
            custom_item.width = this.listView.width;
            custom_button.x = custom_item.width / 2;
            custom_button.y = custom_item.height / 2;
            custom_item.addChild(custom_button);

            this.listView.pushBackCustomItem(custom_item);
        }
            // insert custom item
            var items_count = this.listView.getItems().length;
            for (var i = 0; i < count / 4; ++i) {
                var custom_button = new ccui.Button();
                custom_button.setName("TextButton");
                custom_button.setTouchEnabled(true);
                custom_button.setScale9Enabled(true);
                custom_button.loadTextures(res.s_ItemBg1_png, res.s_ItemBg2_png, res.s_ItemBg2_png);
                custom_button.setContentSize(default_button.getContentSize());

                var custom_item = new ccui.Layout();
                custom_item.setContentSize(custom_button.getContentSize());
                custom_item.width = this.listView.width;
                custom_button.x = custom_item.width / 2;
                custom_button.y = custom_item.height / 2;
                custom_item.addChild(custom_button);

                this.listView.insertCustomItem(custom_item, items_count);
            }

            // set item data
          items_count = this.listView.getItems().length;
            for (var i = 0; i < 10; ++i) {
                var item = this.listView.getItem(i);
                var button = item.getChildByName("TextButton");
                var index = this.listView.getIndex(item);
                button.setTitleColor(cc.color(0,0,0,255));
                button.setTitleText(this._array[index]);
            }
            
            // remove last item
            //listView.removeLastItem();

            // remove item by index
           // items_count = listView.getItems().length;
            //listView.removeItem(items_count - 1);

            // set all items layout gravity
            this.listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

            
        //播放背景音乐
        cc.audioEngine.playMusic(res.s_Backgroundmusic, true);
        return true;
    },
    
    listViewCallBack:function(sender, type){
        var listViewEx = sender;
        var item = this.listView.getItem(listViewEx.getCurSelectedIndex());
        var button = item.getChildByName("TextButton");
        this.label2.setString(button.getTitleText());
    },

    /*selectedItemEvent: function (sender, type) {
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                break;

            default:
                break;
        }
    }*/

    startGameCallBack:function() {
        // body...
        //播放音乐特效
        cc.audioEngine.playEffect(res.s_ModeSelect02,false);

        //切换至Game4Key场景 
        var newScene = new Game4KeyScene();
        newScene.musicName = res.s_Caocao_mp3;
        newScene.musicBeatMap = res.s_Caocao_4k_nm_json;
        cc.director.runScene(newScene);
    },

});

//创建首页场景类
var Home = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HomeLayer();
        this.addChild(layer);
    }
});
