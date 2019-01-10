@jump label=common
*removeButtons
<sync>
    @inactivate id="sel1"
    @inactivate id="sel2"
</sync>
[popstate]

;Scene: 作業終わらなくて怒られ

*common

@jump label=removeButtons pushstate=true

#上司
田中くんちょっと良いかな。[p]
このあと30分後すぐ会議なんだけど、資料のこの部分の担当君だよね？[p]
私データ手元無いから、すぐ直してもらえる？[p]
[cm]

#田中
わかりました。[p]
[cm]

#上司
じゃ、よろしくね。[p]
終わったら私の机に置いといて。[p]
[cm]

#電話
PULLLLL PULLLLL[p]
[cm]

#田中
(電話だ！)[p]
(でも上司に急ぎって言われたし……どうする？)[p]
<sync>
    @activate id="sel1"
    @activate id="sel2"
    [button id=sel1 goto=phone text="電話を取る"]
    [button id=sel2 goto=nophone text="上司のお願いを優先する"]
    [stop]
</sync>

*phone
[cm]
@jump label=removeButtons pushstate=true

#田中
ガチャ(電話をとる)[p]
[cm]

#田中
はい、●●株式会社開発部署システム担当の田中です。[p]
[cm]

#客
えー、私、株式会社ホゲホゲの山田と申します。[p]
あのー、先月納品頂いたXシステムに不具合がありまして。[p]
[cm]

#田中
(Xシステムは自分も担当したから、解決出来るかもしれないな)[p]
(そんなに時間は掛からなさそうかな……どうする？)[p]

<sync>
    @activate id="sel1"
    @activate id="sel2"
    [button id=sel1 goto=phone1 text="詳細を聞く"]
    [button id=sel2 goto=phone2 text="別の担当に回す"]
    [stop]
</sync>
[stop]

*phone1
[cm]
@jump label=removeButtons pushstate=true

#田中
詳しく聞かせて頂いてもよろしいでしょうか？[p]
[cm]

#
[cm]
長引くこと数十分…[p]
[cm]

#田中
それではこちらの方、対応いたします。[p]
この度は申し訳ありませんでした。[p]
[cm]

#田中
ガチャ(電話を切る)[p]
[cm]

#上司
田中くん！出来たかい？！[p]
[cm]

#田中
すみません！まだ出来てないです！[p]
[cm]

#上司
まずいよ！！もう会議行かなきゃ！[p]
困るなーーーーー！[p]
[cm]

@jump label="end"
[stop]

*phone2
[cm]
@jump label=removeButtons pushstate=true

#田中
分かりました。[p]
今、担当の者に代わりますので。(内線ポチー)[p]
[cm]

#田中
よし、資料直すか…[p]
[cm]

#
[cm]
数十分後…[p]
[cm]

#田中
出来たぞ！[p]
[cm]

#田中
(上司の机に置きに行く)[p]
[cm]

#上司
おっ、田中くん出来たかい？[p]
[cm]

#田中
はい！確認お願いします。[p]
[cm]

#上司
フム……[p]
うん、良さそうだね。[p]
ありがとう、助かったよ。[p]
[cm]

#田中
いえ、もともと僕のミスなので。[p]
[cm]

#上司
これからもよろしくね。[p]
[cm]

@jump label="end"
[stop]

*nophone
[cm]
@jump label=removeButtons pushstate=true

#田中
(急ぎだから今は取れないな…)[p]
[cm]

#先輩
はい、●●株式会社サポート部署の菊池です。[p]
[cm]

#客
えー、私、株式会社ホゲホゲの山田と申します。[p]
あのー、先月納品頂いたXシステムに不具合がありまして。[p]
[cm]

#先輩
それは申し訳ありません。[p]
詳しく状況を教えて頂けますでしょうか？[p]
[cm]

#田中
よし、資料直すか…[p]
[cm]

#
[cm]
数分後…[p]
[cm]

#先輩
田中くん、いいかな。[p]
[cm]

#田中
はい、なんでしょう。[p]
[cm]

#先輩
君さー、自分の仕事じゃなくて、普通お客様優先するよねー。[p]
[cm]

#田中
すみません、今急ぎの作業があって…[p]
[cm]

#先輩
そんなの良いからさ。お客様が第一でしょ。[p]
ていうかさっきの電話、開発部署のミスでしょ。[p]
どうなってんの？[p]
[cm]

#田中
えーと…[p]
[cm]

#
[cm]
数十分後…[p]
[cm]

#先輩
それじゃあ、ほんと頼むよー？[p]
[cm]

#田中
すみませんでした……[p]
[cm]

#上司
田中くん！出来た？[p]
[cm]

#田中
すみません！まだです！[p]
[cm]

#上司
まずいよーーー！！もう会議行かなきゃ！[p]
困るなーーーーー！[p]
[cm]

@jump label="end"


*end

[cm]
#
------------END--------------[p]
[cm]

@load script="script/title.as" ui="ui/title.ui"
