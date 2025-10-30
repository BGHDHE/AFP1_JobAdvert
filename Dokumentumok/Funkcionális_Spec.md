# Funkcinális specifikáció

## A rendszer céljai és nem céljai

Céljai:

Egy modern, reszponzív webes platform létrehozása, amely megkönnyíti a cégek és álláskeresők közötti kapcsolatot.

Lehetővé tenni a cégek számára álláshirdetések létrehozását, szerkesztését és törlését.

Az álláskeresők számára lehetőséget biztosítani a hirdetések böngészésére, jelentkezésre és jelentkezéseik nyomon követésére.

A rendszer kezelje a felhasználói fiókokat és biztosítsa az adatok biztonságát.

Különböző eszközökön (asztali gép, tablet, mobil) is egységes felhasználói élményt nyújtson.

Nem céljai:

Nem célja országos szintű, nagyvállalati szintű toborzási rendszer kialakítása.

Nem célja automatizált párosítás vagy mesterséges intelligencia alapú ajánlórendszer létrehozása.

Nem célja fizetési, számlázási vagy hirdetési díjrendszer implementálása.

## Jelenlegi helyzet leírása

Jelenleg a cégek és álláskeresők közötti kapcsolatfelvétel elsősorban külső, nagy állásportálokon vagy közösségi médiafelületeken zajlik.
Ezek a platformok azonban gyakran túl bonyolultak, lassúak vagy fizetős funkciókat tartalmaznak.
Szükség van egy egyszerű, gyors, letisztult és ingyenes mintaalkalmazásra, amely bemutatja az álláshirdetési és jelentkezési folyamat működését két szereplő között (cég ↔ álláskereső).

## Vágyálom rendszer leírása

A vágyálom rendszer célja, hogy minden résztvevő számára egyértelmű és egyszerű folyamatot biztosítson:

A cégek pár kattintással feladhatnak hirdetéseket, módosíthatják azokat, és nyomon követhetik a jelentkezőket.

Az álláskeresők egyszerűen böngészhetnek, jelentkezhetnek és kezelhetik saját pályázataikat.

A rendszer automatikusan kezeli a státuszokat („pending”, „accepted”, „rejected”).

A felület reszponzív, tehát bármilyen eszközön kényelmesen használható.

A felhasználói adatok biztonságosan, jelszóvédetten kerülnek tárolásra.

## A rendszerre vonatkozó külső megszorítások

A rendszernek meg kell felelnie az alapvető adatvédelmi (GDPR) elvárásoknak.

Csak böngésző alapú működés megengedett (telepítés nélkül).

Az adatkezelés MySQL alapú, XAMPP környezetben.

A fejlesztés Angular keretrendszerben történik.

Az üzemeltetéshez szükséges minimális hardverigény: internetkapcsolattal rendelkező számítógép.

## Jelenlegi üzleti folyamatok modellje

A jelenlegi (nem informatikai) folyamat során a cégek manuálisan, e-mailben vagy telefonon hirdetnek állásokat, míg az álláskeresők önéletrajzot küldenek vagy személyesen érdeklődnek.
Ez időigényes, nehezen átlátható és sokszor adatvesztéssel jár.

## Igényelt üzleti folyamatok modellje

A cég online hoz létre hirdetést → a hirdetés megjelenik az adatbázisban → az álláskeresők böngészhetnek és jelentkezhetnek rá.

Az álláskereső regisztrál, bejelentkezik, böngészi a hirdetéseket, jelentkezik, majd visszavonhatja a pályázatát.

A rendszer automatikusan naplózza az eseményeket és biztosítja a megfelelő hozzáféréseket (csak saját adatok módosíthatók).

