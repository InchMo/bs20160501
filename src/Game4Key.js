var game4KeyLayer = cc.Layer.extend({
    ctor:function() {
        // body...
        this._super();
        cc.audioEngine.playMusic(res.s_Andy_mp3, true);
        var winSize = cc.director.getWinSize();

        var perKeyW = winSize.width / 8;
        this.perNoteBottom_X = perKeyW;
        this.speed = 1;
        this.score = 0;
        this.curCombo = 0;

        //触摸区域
        this.key1Rect = cc.rect(0, 0, perKeyW * 2, winSize.height / 3);
        this.key2Rect = cc.rect(perKeyW * 2, 0, perKeyW * 2, winSize.height / 3);
        this.key3Rect = cc.rect(perKeyW * 4, 0, perKeyW * 2, winSize.height / 3);
        this.key4Rect = cc.rect(perKeyW * 6, 0, perKeyW * 2, winSize.height / 3);

        var pSprite = new cc.Sprite(res.s_Andy_png);
        pSprite.setScale(2);
        pSprite.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(pSprite, 0);

        var panlGameSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("panl_game.png"));
        panlGameSprite.setScale(4.1);
        panlGameSprite.setAnchorPoint(0.5,1);
        panlGameSprite.setPosition(winSize.width/2 + 2,winSize.height - 100);
        this.addChild(panlGameSprite, 1);

        var panl4KSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("panl_4k.png"));
        panl4KSprite.setScale(2);
        panl4KSprite.setPosition(winSize.width/2, 60);
        this.addChild(panl4KSprite, 1);

        var base = winSize.width/3 + 70;
        var path =  winSize.width /15;
        this.bornNotePos1 = cc.p(base,winSize.height - 110);
        this.bornNotePos2 = cc.p(base+path,winSize.height - 110);
        this.bornNotePos3 = cc.p(base+2*path,winSize.height - 110);
        this.bornNotePos4 = cc.p(base+3*path,winSize.height - 110);

        //按键
        var bottomButton0_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_1.png"));
        bottomButton0_1.setPosition(perKeyW + 15, panl4KSprite.y + 20);
        bottomButton0_1.setScale(2.5);
        this.addChild(bottomButton0_1, 3);
       
        var bottomButton0_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_2.png"));
        bottomButton0_2.setPosition(perKeyW * 3 + 5, panl4KSprite.y + 20);
        bottomButton0_2.setScale(2.5);
        this.addChild(bottomButton0_2, 3);
        
        var bottomButton0_3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_3.png"));
        bottomButton0_3.setPosition(perKeyW * 5 - 5, panl4KSprite.y + 20);
        bottomButton0_3.setScale(2.5);
        this.addChild(bottomButton0_3, 3);

        var bottomButton0_4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_0_4.png"));
        bottomButton0_4.setPosition(perKeyW * 7 - 15, panl4KSprite.y + 20);
        bottomButton0_4.setScale(2.5);
        this.addChild(bottomButton0_4, 3);

        //按键特效
        var bottomButton1_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_1.png"));
        bottomButton1_1.setPosition(perKeyW + 15, panl4KSprite.y + 20);
        bottomButton1_1.setScale(2.5);
        this.addChild(bottomButton1_1, 3);
       
        var bottomButton1_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_2.png"));
        bottomButton1_2.setPosition(perKeyW * 3 + 5, panl4KSprite.y + 20);
        bottomButton1_2.setScale(2.5);
        this.addChild(bottomButton1_2, 3);
        
        var bottomButton1_3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_3.png"));
        bottomButton1_3.setPosition(perKeyW * 5 - 5, panl4KSprite.y + 20);
        bottomButton1_3.setScale(2.5);
        this.addChild(bottomButton1_3, 3);

        var bottomButton1_4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_1_4.png"));
        bottomButton1_4.setPosition(perKeyW * 7 - 15, panl4KSprite.y + 20);
        bottomButton1_4.setScale(2.5);
        this.addChild(bottomButton1_4, 3);

        var comble = new cc.LabelBMFont("", res.s_Futura);
        comble.setPosition(winSize.width / 2, winSize.height / 2 + 30);
        this.addChild(comble, 10, 10);

        var scoreLable = new cc.LabelAtlas("0", res.s_Jinscore_plist);
        //scoreLable.setString("0");
        scoreLable.setPosition(winSize.width - 20, winSize.height - 40);
        this.addChild(scoreLable, 10, 11);
        //scoreLable.setPosition(winSize.width*2/3, winSize.height/2);
        var buttonx = bottomButton0_1.x;
        var buttony = bottomButton0_1.y;
        var buttonWidth = bottomButton0_1.width;
        var buttonHeight = bottomButton0_1.height;

        this.greatRect = cc.rect(buttonx, buttony + buttonHeight, buttonWidth, buttonHeight * 3);
        this.betterRect1 = cc.rect(buttonx, buttony + buttonHeight, buttonWidth, buttonHeight);
        this.perfectRect = cc.rect(buttonx, buttony, buttonWidth, buttonHeight);
        this.betterRect2 = cc.rect(buttonx, buttony - buttonHeight, buttonWidth, buttonHeight);
        

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());  //相对于target左下解的坐标（x,y）
                var touchKey = target.containsTouchLocation(locationInNode);
                console.log(touchKey);
                switch (touchKey) {
                    case 1:
                        console.log("key1");
                        //draw1->drawPolygon(star1, sizeof(star1) / sizeof(star1[0]),
                        //ccc4f(0.2, 0.8, 1, 0.5), 1, ccc4f(0, 0, 1, 255));
                        //zOrderSprite(bottomButton0_1, bottomButton1_1);
                        target.showCombo(target.checkScore(target.getChildByTag(1)));
                        break;
                    case 2:
                        console.log("key2");
                        target.showCombo(target.checkScore(target.getChildByTag(2)));
                        break;
                    case 3:
                        console.log("key3");
                        target.showCombo(target.checkScore(target.getChildByTag(3)));
                        break;
                    case 4:
                        console.log("key4");
                        target.showCombo(target.checkScore(target.getChildByTag(4)));
                        break;
                    default:
                        break;
                }
            }
        });
        cc.eventManager.addListener(listener,this);
        this.schedule(this.born,0.5);  
        return true;
    },



    born:function(){
        var rand=Math.random();
        rand=rand*100;
        rand=(Math.floor(rand))%4+1;

        if (rand == 1) {
            var musicNote_4_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_1.png"));
            musicNote_4_1.setPosition(this.bornNotePos1);//bornNotePos1
            musicNote_4_1.setScale(1);
            this.addChild(musicNote_4_1, 4, 1);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 3),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X - 60, -40)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_1));
            musicNote_4_1.runAction(seq);
        }

        if (rand == 2) {
            var musicNote_4_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_2.png"));
            musicNote_4_2.setPosition(this.bornNotePos2);//bornNotePos1
            musicNote_4_2.setScale(1);
            this.addChild(musicNote_4_2, 4, 2);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 3),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X*3 - 15, -40)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_2));
            musicNote_4_2.runAction(seq);
        }

        if (rand == 3) {
            var musicNote_4_3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_3.png"));
            musicNote_4_3.setPosition(this.bornNotePos3);//bornNotePos1
            musicNote_4_3.setScale(1);
            this.addChild(musicNote_4_3, 4, 3);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 3),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X*5 + 15, -40)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_3));
            musicNote_4_3.runAction(seq);
        }

        if (rand == 4) {
            var musicNote_4_4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_4key_3_4.png"));
            musicNote_4_4.setPosition(this.bornNotePos4);//bornNotePos1
            musicNote_4_4.setScale(1);
            this.addChild(musicNote_4_4, 4, 4);
            var spawn = cc.Spawn.create(cc.ScaleTo.create(this.speed, 3),
                    new cc.moveTo(this.speed, cc.p(this.perNoteBottom_X*7 + 60, -40)));
            var seq = new cc.Sequence(spawn, cc.CallFunc.create(this.pCallback, this,  musicNote_4_4));
            musicNote_4_4.runAction(seq);
        }

    },

    pCallback:function(object){
        var winSize = cc.director.getWinSize();
        //console.log(v);
        this.curCombo = 0;
        var curCombLable = this.getChildByTag(10);
        curCombLable.setString(parseInt(this.curCombo));

        var miss = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_miss.png"));
        miss.setPosition(winSize.width/2, winSize.height - 60);
        miss.setScale(0.5);
        this.addChild(miss);
        var seq = cc.Sequence.create(cc.ScaleTo.create(0.5, 3), cc.CallFunc.create(this.s_pCallback, this, miss));
        miss.runAction(seq);
        object.removeFromParent(true);
    },

    containsTouchLocation:function(touch) {
        if (cc.rectContainsPoint(this.key1Rect, touch)) {
            return 1;
        }
        if (cc.rectContainsPoint(this.key2Rect, touch)) {
            return 2;
        }
        if (cc.rectContainsPoint(this.key3Rect, touch)) {
            return 3;
        }
        if (cc.rectContainsPoint(this.key4Rect, touch)) {
            return 4;
        }
        return 0;
    },

    checkScore:function(pNode) {
        var checkid=0;
        if (pNode == null) {
            return checkid;
        }
        var s_y = pNode.getPosition().y - 10;
        var s_grect_maxy = cc.rectGetMinY(this.greatRect);
        var s_grect_miny = cc.rectGetMinY(this.greatRect);
        var s_brect1_maxy = cc.rectGetMaxY(this.betterRect1);
        var s_brect1_miny = cc.rectGetMinY(this.betterRect1);
        var s_prect_maxy = cc.rectGetMaxY(this.perfectRect);
        var s_prect_miny = cc.rectGetMinY(this.perfectRect);
        var s_brect2_maxy = cc.rectGetMaxY(this.betterRect2);
        var s_brect2_miny = cc.rectGetMinY(this.betterRect2);

        if (s_y >= s_grect_miny && s_y <= s_grect_maxy) { //大perfect
            checkid = 3;
            pNode.removeFromParent(true);
        } else if (s_y >= s_brect1_miny && s_y <= s_brect1_maxy) { //小perfect
            checkid = 2;
            pNode.removeFromParent(true);
        } else if (s_y >= s_prect_miny && s_y <= s_prect_maxy) { //great
            checkid = 1;
            pNode.removeFromParent(true);
        } else if (s_y >= s_brect2_miny && s_y <= s_brect2_maxy) { //great
            checkid = 2;
            pNode.removeFromParent(true);
        }else { //miss
            checkid = 0;
        }
        return checkid;
    },

    showCombo:function(id) {
        if (id == 0) {
            return;
        }
        var s_p;
        var winSize = cc.director.getWinSize();
        if (id == 1) {
            s_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_bperfect.png"));
        //if (this->HP < 100) {
         //   this->lastHP = HP;
          //  this->HP += 20;
            this.score += 200;
            this.curCombo++;
        //}
        }
        if (id == 2) {
            s_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_perfect.png"));
            this.score += 150;
            this.curCombo++;
        }
        if (id == 3) {
            s_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s_great.png"));
            this.score += 100;
            this.curCombo++;
        }
        if(s_p != null){
            s_p.setPosition(winSize.width/2, winSize.height - 60);
            s_p.setScale(0.5);
            this.addChild(s_p);
            var seq = cc.Sequence.create(cc.ScaleTo.create(0.5, 3), cc.CallFunc.create(this.s_pCallback, this,  s_p));
            s_p.runAction(seq);

            var scoreLable = this.getChildByTag(11);
            if(this.score>9&&this.score<99)
                scoreLable.setPosition(winSize.width - 40, winSize.height - 40);
            if(this.score>99&&this.score<999)
                scoreLable.setPosition(winSize.width - 60, winSize.height - 40);
            if(this.score>999&&this.score<9999)
                scoreLable.setPosition(winSize.width - 80, winSize.height - 40);
            if(this.score>9999&&this.score<99999)
                scoreLable.setPosition(winSize.width - 100, winSize.height - 40);
            scoreLable.setString(parseInt(this.score));
        }
        var curCombLable = this.getChildByTag(10);
        curCombLable.setString(parseInt(this.curCombo));
        //if (maxCombo <= curCombo) {
           // maxCombo++;
        //}
        
        /*
        s_p->setScale(0.2);
        this->addChild(s_p, 10);
        s_p->setPosition(
              ccp(origin.x+visibleSize.width/2,origin.y+visibleSize.height/2+80));
    CCCallFuncN* s_pCallBack = CCCallFuncN::create(this,
            callfuncN_selector(Game4Key::remove));
    CCAction* s_pAction = CCSequence::create(CCScaleTo::create(0.2, 1),
            s_pCallBack, NULL);
    s_p->runAction(s_pAction);
    CCLabelBMFont* curCombLable = (CCLabelBMFont*) getChildByTag(10);
    CCLabelAtlas* scoreLable = (CCLabelAtlas*) getChildByTag(11);
    char string[12] = { 0 };
    char strscore[12] = { 0 };
    sprintf(string, "%d", curCombo);
    curCombLable->setString(string);
    sprintf(strscore, "%d", score);
    scoreLable->setString(strscore);
    */
    },
    s_pCallback:function(object){
        object.removeFromParent(true);
    },

});

var Game4KeyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new game4KeyLayer();
        this.addChild(layer);
    }
});