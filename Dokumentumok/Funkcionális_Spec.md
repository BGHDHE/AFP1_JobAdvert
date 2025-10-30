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

# Követelménylista

Felhasználói regisztráció és bejelentkezés.

Cég típusú felhasználók számára hirdetések létrehozása, módosítása, törlése.

Álláskeresők számára álláshirdetések böngészése, jelentkezés, visszavonás.

Jelentkezések státuszának kezelése.

Profiladatok megtekintése és szerkesztése.

Elmentett állások kezelése.

Adatok biztonságos tárolása (titkosított jelszavak).

# Használati esetek

Cég Lehetőségük van álláshirdetések létrehozásához, saját álláshirdetések módosításához és törléséhez, valamint álláskeresők jelentkezésének elfogadására vagy elutasítására.

Álláskeresők Képesek megtekinteni minden álláshírdetést, azokra jelentkezni illetve lejelentkezni. Viszont nincs lehetőségük álláshirdetéseket módosítani, létrehozni vagy törölni.

# Megfeleltetés, hogyan fedik le a használati eseteket a követelmények

Regisztáció: Itt képesek a felhasználók Céges, vagy álláskereső profilt létrehozni, hogy később az oldal további funkcióit elérhessék.

Bejelentkezés: Itt van lehetősége a már fiókkal rendelkező felhasználóknak belépni és használni az oldal adta opciókat.

Álláshirdetés létrehozása: A céges felhasználók itt képesek létrehozni új álláshirdetést amire később jelentkezéseket adhatnak le az álláskeresők.

Álláshirdetés módosítása: Már létező álláshirdetést itt képes a Cég felhasználó módosítani.

Álláshirdetés törlése: Amennyiben az állás már nem aktuális abban az esetben itt van Cég felhasználóknak lehetősége törölni a releváns hirdetést.

Álláshirdetések böngészése: Álláskeresőknek itt van lehetősége böngészni az összes meghirdetett állást.

Álláshirdetések jentkezés: Itt van álláskeresőknek alkalma jelentkezni állásokra amik felkeltették érdeklődésüket.

Álláshirdetések visszavonás: Itt tudnak az álláskeresők lejelentkezni olyan álláshirdetésekről amikre már korábban jelentkeztek.

Jelentkezések státuszának kezelése: Céges felhasználóknak ezen a helyen van lehetőségük elutasítani vagy elfogadni jelentkezéseket az általuk meghirdetett állásokra.

Profiladatok felhasználóknak itt van lehetősége saját adataiknak a módosítására/megtekintésére.

Elmentett állások kezelése: Álláskeresőknek itt elérhető a már jelentkezett álláshirdetések kezelésére.

# Képernyő tervek

Bejelentkezés/Regisztráció <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/cc02cd09-954c-4577-a3b2-944272f88495" /> 
Regisztráció panel <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/029dc843-3e37-4133-8db9-11a65e63acbd" /> 
Bejelentkezés panel <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/4e6dff25-e8ba-4219-abb9-0196c9d60d44" /> 
Álláskereső munka böngészés <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/fe58c031-497c-4d19-8eb0-15664cf6c1d9" />
Cég felhasználó álláshirdetései <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/71d7ee39-3fae-405d-a3d8-c3b7eae78478" />
Álláshirdetésre jelentkezők kezelése <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/a29a94c0-617e-483e-93b8-affa84d71502" />
Cég profil módosítása <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/9f967cbc-4d9f-413b-b700-7b735a7b5d4f" />
Felhasználó profil módosítása <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/ed58f901-07f5-422b-9ec6-00412a34db06" />
Elmentett állások böngészése <img width="1176" height="604" alt="Image" src="https://github.com/user-attachments/assets/e95a9db3-b797-4673-b7bf-0dcf79748ac8" />

# Forgatókönyvek

## Alap forgatókönyv:
Amikor megnyitódik a weboldal akkor a látogatónak lehetősége van regisztrálni vagy bejelentkezni már meglévő fiókjába. Bejelentkezés esetén megadja a felhasználónevét és jelszavát, ezek után pedig beléphetnek az oldalra. Regisztráció opció választásakor viszont meg kell adnia a felhasználónevét, jelszavát majd meg kell ismételnie a jelszavát ismét.

## Céges felhasználó
Céges felhasználó belépés után navigálódik az oldalra ahol létrehozhat/nézheti az általuk létrehozott álláshirdetéseket. Ezután az új gombra kattintva létrehozhat újj álláshirdetést ahol meg kell annak nevét illetve adatait adnia. Ezután később módosíthatja vagy törölheti a hirdetést kedve szerint a megfelelő gombokra kattintva.

## Álláskereső felhasználó
Álláskereső felhasználó belépés után egy oldalra kerül ahol állások vannak listázva előtte. Itt böngészhet állások között ami érdekli és jelentkezhet rájuk. Jelentkezést követően az adott hirdetés elmentődik. És lehetősége lesz a felhasználónak lejelentkeznie róla az elmentett állásai oldalról vagy ott helyben. A profil gombra kattintás után lehetősége lesz Módosítania a felhasználónevén, jelszaván, illetve egyéb adatokat képes megadni magáról.
