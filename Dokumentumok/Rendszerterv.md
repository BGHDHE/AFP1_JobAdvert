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



# Követelmények

## Funkcionális követelmények

- **Bejegyzések tárolása:** Képes képeket és más formátumokat (pl. GIF) kezelni az álláshirdetések részeként.  
- **Felhasználói adatok kezelése:** Tárolja a felhasználónév, jelszó és email adatokat.  
- **Webes működés:** Reszponzív felület, számítógépen és mobil eszközön egyaránt használható. 
- **Adatbázissal való gördülékeny kommunikáció:** A webes felület folyamatosan szinkronizál a MySQL adatbázissal.  


## Nemfunkcionális követelmények

- **Adatbiztonság:** Felhasználók nem módosíthatják mások bejegyzéseit.    
- **Felhasználóbarát kezelés:** Az oldal könnyen kezelhető, minimális informatikai tudással is használható.  
- **Webes adatkezelés:** Az oldal képes az adatbázist webes felületen kezelni.  
- **Hardverigény:** Csak okoseszközre és internetkapcsolatra van szükség, különleges hardver nem szükséges.  
- **Telepítésmentes használat:** Az oldal telepítés nélkül, bármilyen böngészőn elérhető, külön kiegészítők nélkül.  



# Funkcionális terv

## 5.1 Rendszerszereplők

A rendszer működése két fő felhasználói szerepkörre épül:


### Cég (Company)
- A cég felhasználók jogosultak az álláshirdetések létrehozására, módosítására és törlésére.  
- Megtekinthetik a beérkezett jelentkezéseket az álláshirdetésekhez.  
- Kizárólag a saját hirdetéseikhez kapcsolódó adatokhoz férhetnek hozzá, más cégek hirdetéseihez nem.  


### Álláskereső (Seeker)
- Az álláskeresők böngészhetik az összes elérhető állást, jelentkezhetnek rájuk és visszavonhatják a jelentkezéseiket.  
- Megtekinthetik, mely pozíciókra adtak be pályázatot.  
- A rendszer biztosítja, hogy az álláskeresők csak a saját profiljuk adataihoz férjenek hozzá.  



# Fizikai környezet és Architekturális terv

## Fizikai környezet
- Az alkalmazás asztali platformra készült, és **bármilyen PC-ről elérhető** internetkapcsolat mellett.  
- **Nincs szükség további alkalmazások telepítésére** a futtatáshoz.  

## Architekturális terv

### Backend szerver
- Az alkalmazás backendje **MySQL adatbázisra** épül, amelyet a **XAMPP szerver** futtat.  
- A backend biztosítja az adatok kezelését, tárolását és lekérdezését az álláshirdetések és felhasználói adatok számára.  
- A frontend HTTP kéréseken keresztül kommunikál a backenddel, a válaszok **JSON formátumban** érkeznek.  
- A backend feladata a **biztonságos adatkezelés**, a felhasználói jogosultságok ellenőrzése és a rendszer logikájának kiszolgálása.  

### Frontend kliens
- A frontend **Angular keretrendszerrel** készült, amely lehetővé teszi a **modern, reszponzív webes alkalmazások** létrehozását.  
- Az alkalmazás a **HTML, CSS és JavaScript/TypeScript** kombinációját használja a felhasználói felület megjelenítésére és interaktív funkciók biztosítására.  
- A frontend és a backend közötti kommunikáció **REST API-n és JSON formátumon** keresztül történik.  
- A frontend feladata a **felhasználói élmény biztosítása**, a tartalmak dinamikus megjelenítése és az állások böngészésének, jelentkezésének kezelése.    



# Adatbázis terv

## USER (Felhasználók)
- **username** (VARCHAR, PRIMARY KEY) – egyedi felhasználónév  
- **password** (VARCHAR) – jelszó, titkosítva tárolva  
- **email** (VARCHAR) – felhasználó email címe  
- **role** (ENUM: 'company', 'seeker') – felhasználói szerepkör  

## COMPANY (Cégek)
- **id** (INT, PRIMARY KEY, AUTO_INCREMENT) – egyedi azonosító  
- **user_username** (VARCHAR, FOREIGN KEY → USER.username) – a cég felhasználói profilja  
- **company_name** (VARCHAR) – cég neve  
- **description** (TEXT) – rövid leírás a cégről  

## JOBS (Álláshirdetések)
- **id** (INT, PRIMARY KEY, AUTO_INCREMENT) – egyedi álláshirdetés azonosító  
- **company_id** (INT, FOREIGN KEY → COMPANY.id) – a hirdetést létrehozó cég  
- **title** (VARCHAR) – az állás pozíciója  
- **description** (TEXT) – részletes állásleírás  
- **location** (VARCHAR) – munkavégzés helye  
- **date_posted** (DATETIME) – hirdetés létrehozásának időpontja  

## APPLICATIONS (Jelentkezések)
- **id** (INT, PRIMARY KEY, AUTO_INCREMENT) – egyedi azonosító  
- **job_id** (INT, FOREIGN KEY → JOBS.id) – mely állásra jelentkezett a felhasználó  
- **seeker_username** (VARCHAR, FOREIGN KEY → USER.username) – jelentkező felhasználó  
- **date_applied** (DATETIME) – jelentkezés időpontja  
- **status** (ENUM: 'pending', 'accepted', 'rejected') – jelentkezés státusza  
 
## SAVED_JOBS (Elmentett állások)
- **seeker_username** (VARCHAR, FOREIGN KEY → USER.username) – az álláskereső  
- **job_id** (INT, FOREIGN KEY → JOBS.id) – elmentett állás azonosító  
- **date_saved** (DATETIME) – mentés időpontja


# Tesztterv, Telepítési és Karbantartási terv

## Tesztterv
*A tesztelési rész részletesen a rendszer működését, hibamentességét és felhasználói élményét ellenőrzi. A tesztelés magában foglalja a frontend és backend funkciók, az adatbázis műveletek és a felhasználói interakciók vizsgálatát.*

- **Frontend tesztelés:** Ellenőrizni kell a reszponzív megjelenést, a formok működését, a jelentkezés és álláshirdetés létrehozás folyamatát.  
- **Backend tesztelés:** Ellenőrizni kell a REST API végpontokat, az adatbázis műveletek helyességét és a felhasználói jogosultságokat.  
- **Integrációs teszt:** A frontend és backend közötti kommunikáció tesztelése JSON adatokon keresztül.  
- **Felhasználói teszt:** Valódi felhasználók bevonásával ellenőrizni a funkcionalitást és a felhasználói élményt.  

## Telepítési terv

### Fizikai telepítési terv
- Egy szervergépre szükséges **XAMPP telepítése**, amely tartalmazza a MySQL (MariaDB) adatbázist.  
- Feltölteni az adatbázis sémát a megfelelő fájlokkal.  
- Az Angular frontend és a hozzá tartozó Node.js/JavaScript környezet futtatása az adott szerveren.  

### Szoftver telepítési terv
- A portál eléréséhez elegendő az alkalmazás letöltése, telepítése és futtatása bármely PC-n, amely **internetkapcsolattal** rendelkezik.  
- Telepítéshez nincs szükség további szoftverekre vagy kiegészítőkre a felhasználó gépén.  

## Karbantartási terv

### Tartalmi karbantartás
- A portálon megjelenő tartalmak folyamatos ellenőrzés alatt állnak; a **nem kívánt vagy káros tartalmak törlésre kerülnek**.  
- Időszakosan ellenőrizhető a felhasználói profilok és bejegyzések tartalma, a sértő vagy káros szavak kiszűrésére.  
- A troll felhasználók elleni védelem és moderáció folyamatosan történik.  

### Rendszeres karbantartás
- **Adatbázis karbantartása:**  
  - Az adatbázis séma biztosítja a törölt felhasználók posztjainak automatikus eltávolítását.  
  - Időszakos karbantartás keretében törlésre kerülnek a felesleges adatok, például spam kommentek vagy inaktív felhasználók.  
  - Rendszeres biztonsági mentés készül a szerverről.  

- **Szerver karbantartása:**  
  - A forráskód karbantartása során törekedünk arra, hogy a jövőbeni frissítésekhez **minimális módosításra** legyen szükség.  
  - A függőségek verziószámai rögzítve vannak, hogy a rendszer stabilan és megbízhatóan működjön.  



