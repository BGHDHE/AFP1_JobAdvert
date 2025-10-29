# Rendszerterv

## Célkitűzés

A rendszer célja egy olyan **webes platform** létrehozása, amely megkönnyíti a **cégek** és az **álláskeresők** közötti kapcsolatfelvételt.  
Az oldal lehetőséget biztosít a vállalatok számára, hogy egyszerűen és gyorsan meghirdethessék aktuális állásajánlataikat, kezelhessék azokat, valamint nyomon követhessék a beérkező jelentkezéseket.  
Az álláskeresők (seeker felhasználók) pedig böngészhetnek a meghirdetett pozíciók között, **jelentkezhetnek**, **visszavonhatják** a jelentkezésüket, és **megtekinthetik**, mely állásokra adtak be pályázatot.


## Rendszerszerepek és jogosultságok

A rendszer működésének alapja a **felhasználói jogosultságok elkülönítése**.  
Regisztrációkor a felhasználók alapértelmezett szerepkört kapnak, amely meghatározza, milyen műveleteket végezhetnek az oldalon.



### Álláskereső (Seeker)

- Böngészhet az elérhető állások között.  
- Jelentkezhet a kiválasztott pozíciókra.  
- Törölheti a korábbi jelentkezéseit.  
- Megtekintheti, mely hirdetésekre adott be pályázatot.

### Cég (Company)

- Új álláshirdetéseket hozhat létre.  
- Módosíthatja vagy törölheti meglévő hirdetéseit.  
- Megtekintheti, hogy kik jelentkeztek az adott pozíciókra.


## Felhasználói élmény és megjelenés

A fejlesztés során kiemelt figyelmet kap a **felhasználóbarát kezelőfelület** és a **letisztult design**.  
A cél, hogy az oldal egyszerűen használható, átlátható és közérthető legyen mind a cégek, mind az álláskeresők számára.


### Reszponzív design

Az oldal **reszponzív megjelenéssel** készül, így különböző eszközökön – asztali gépen, tableten és mobilon – egyaránt megfelelően használható.  
Ez biztosítja, hogy az oldal nem torzul, az elemek nem csúsznak össze, és a felhasználói élmény minden eszközön egységes maradjon.


## Fejlesztési koncepció

A projekt elsődleges célja nem egy többcéges, országos állásportál létrehozása, hanem egy **mintaalkalmazás**, amely bemutatja az álláshirdetési folyamat működését mindkét oldalról (cég és álláskereső).

A későbbi fejlesztések során a rendszer:
- **bővíthető** többcéges használatra,  
- **skálázható** nagyobb felhasználói bázisra,  
- és **integrálható** további szolgáltatásokkal (pl. e-mail értesítés, fájlcsatolás, statisztikai modul).


## Összegzés

Ez a rendszer egy **modern, Angular + MySQL alapú webalkalmazás**, amely lehetőséget biztosít:  
- a cégek számára az álláshirdetések egyszerű kezelésére,  
- az álláskeresők számára pedig az állások közötti gyors és hatékony böngészésre, valamint jelentkezésre.

A projekt célja tehát egy **megbízható, skálázható és felhasználóbarát** rendszer kialakítása, amely megkönnyíti a munkaerőpiaci kapcsolatok létrejöttét.


# Projektterv

## Projektmunkások és felelősségek

### Frontend
**Csapattagok:**
- Kerekes Benedek  
- Krizsó Csaba  

**Feladataik:**
- A felhasználók által elérhető felületek megtervezése és létrehozása.  
- A backend által biztosított funkciók integrálása és megjelenítése a felhasználói felületen.  
- Egységes, reszponzív és felhasználóbarát design kialakítása.  


### Backend
**Csapattagok:**
- Hegedűs Gergő  
- Fábián Szilárd  

**Feladataik:**
- A frontend kiszolgálása adatokkal, API-k és végpontok megvalósítása.  
- Az adatbázis-struktúra tervezése és a MySQL-alapú adatbázis létrehozása.  
- Az adatkezelés biztonságos és hatékony működésének biztosítása.  


### Tesztelés
**Csapattagok:**
- Hegedűs Gergő  
- Fábián Szilárd  
- Kerekes Benedek  
- Krizsó Csaba  

**Feladataik:**
- A rendszer átfogó tesztelése az üzembe helyezés előtt.  
- Hibák feltárása és dokumentálása.  
- A felhasználói élmény, funkcionalitás és teljesítmény ellenőrzése különböző eszközökön és böngészőkben.  


# Üzleti folyamatok modellje 

## Szerepkörök és fő funkciók

### Cég (Company)

**Feladatai és jogosultságai:**
- Bejelentkezés és kijelentkezés.  
- Saját álláshirdetések létrehozása, módosítása és törlése.  
- Beérkezett jelentkezések megtekintése.  
- Saját profiladatok kezelése.


### Álláskereső (Seeker)

**Feladatai és jogosultságai:**
- Regisztráció és bejelentkezés.  
- Álláshirdetések böngészése.  
- Jelentkezés kiválasztott állásokra.  
- Jelentkezések visszavonása.  
- Saját profiladatok kezelése és frissítése.




