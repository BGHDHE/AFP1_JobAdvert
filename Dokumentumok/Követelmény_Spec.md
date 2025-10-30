Követelmény Specifikáció
Állásportál Webalkalmazás

1. Bevezetés
1.1 Célkitűzés
A projekt célja egy modern, felhasználóbarát állásportál webalkalmazás fejlesztése, amely összeköti a munkáltatókat az álláskeresőkkel. Az alkalmazás lehetővé teszi cégek számára állások meghirdetését, valamint álláskereső felhasználók számára a pozíciókra való jelentkezést.
1.2 Hatókör
Az alkalmazás két fő felhasználói csoportot szolgál ki:

Munkáltatók (Employers): Akik állásokat hirdetnek meg
Álláskeresők (Job Seekers): Akik állásokat keresnek és jelentkeznek

2. Funkcionális Követelmények
2.1 Felhasználói Szerepkörök
2.1.1 Vendég Felhasználó (Guest)

Állásajánlatok böngészése
Állások keresése és szűrése
Állás részleteinek megtekintése
Regisztráció lehetősége

2.1.2 Álláskereső (Job Seeker)

Regisztráció és bejelentkezés
Profil létrehozása és szerkesztése
CV feltöltése és kezelése
Állásokra jelentkezés
Jelentkezések nyomon követése
Állások mentése kedvencek közé
Állásértesítések beállítása

2.1.3 Munkáltató (Employer)

Regisztráció és bejelentkezés
Céges profil létrehozása
Állásajánlatok feladása
Állásajánlatok szerkesztése és törlése
Beérkezett jelentkezések megtekintése
Jelentkezők szűrése és kezelése
Cégprofil szerkesztése (logó, leírás, stb.)

2.2 Főbb Funkciók
2.2.1 Regisztráció és Bejelentkezés
Prioritás: Magas
Követelmények:

Email és jelszó alapú regisztráció
Szerepkör választása regisztrációkor (Seeker/Employer)
Email validáció
Jelszó erősség ellenőrzése (min. 8 karakter, tartalmaz nagybetűt, kisbetűt, számot)
Biztonságos jelszó tárolás (hash)
Bejelentkezés
Elfelejtett jelszó funkció
Kijelentkezés

Bemenet:

Email cím
Jelszó
Felhasználói szerepkör
Alapadatok (név, telefonszám)

Kimenet:

Sikeres regisztráció visszaigazolás
Autentikációs token
Hibaüzenetek validációs problémák esetén

2.2.2 Profil Kezelés
Prioritás: Magas
Álláskereső profil:

Személyes adatok (név, email, telefon, cím)
CV feltöltése (PDF, DOC, DOCX formátumban, max 5MB)
Képzettség, tapasztalat
Készségek (skills)
Profilkép feltöltése

Munkáltató profil:

Cégnév
Cégleírás
Iparág
Cégméret
Weboldal URL
Logó feltöltése
Kapcsolattartó adatok

2.2.3 Állások Böngészése és Keresése
Prioritás: Magas
Követelmények:

Összes állás listázása kártyás nézetben
Keresés pozíció címe alapján
Szűrés az alábbi kategóriák szerint:

Helyszín (város, ország)
Munka típusa (teljes állás, részmunkaidő, távmunka, hibrid)
Kategória/Iparág (IT, marketing, pénzügy, stb.)
Bérsáv
Tapasztalati szint (junior, mid, senior)
Feladás dátuma


Rendezés (legújabb, legrégebbi, bérsáv szerint)
Lapozás (pagination)

Megjelenített információk listanézetben:

Pozíció címe
Cégnév és logó
Helyszín
Munka típusa
Bérsáv (opcionális)
Feladás dátuma
Rövid leírás

2.2.4 Állás Részletes Oldal
Prioritás: Magas
Megjelenített információk:

Pozíció címe
Céginformációk (név, logó, leírás)
Részletes álláskörleírás
Követelmények
Amit kínálnak (juttatások)
Helyszín
Munka típusa
Bérsáv
Tapasztalati szint
Jelentkezési határidő
Feladás dátuma
"Jelentkezés" gomb (bejelentkezett seekernek)
"Megosztás" funkció

2.2.5 Állás Feladása (Employer)
Prioritás: Magas
Követelmények:

Űrlap az állás feladásához
Kötelező mezők:

Pozíció címe
Kategória
Helyszín
Munka típusa
Álláskörleírás
Követelmények


Opcionális mezők:

Bérsáv
Juttatások
Jelentkezési határidő


Draft mentési lehetőség
Előnézet funkció
Publikálás

Validáció:

Minimum karakter számlimits
Maximum karakter számlimits
Kötelező mezők kitöltése

2.2.6 Jelentkezés (Job Seeker)
Prioritás: Magas
Követelmények:

Egyszerű jelentkezés (mentett CV-vel)
Motivációs levél hozzáadása (opcionális)
Jelentkezés visszaigazolása
Jelentkezés visszavonásának lehetősége (megadott időkereten belül)
Duplikált jelentkezés megakadályozása

Folyamat:

Felhasználó rákattint a "Jelentkezés" gombra
Megjelenik a jelentkezési űrlap mentett adatokkal
Lehetőség motivációs levél írására
Jelentkezés elküldése
Visszaigazolás

2.2.7 Jelentkezések Kezelése (Employer)
Prioritás: Közepes
Követelmények:

Összes jelentkezés listázása állás szerint
Jelentkező profiljának megtekintése
CV letöltése
Státusz kezelés (új, átnézve, meghívva interjúra, elutasítva)
Szűrés státusz szerint
Megjegyzések hozzáfűzése jelentkezőkhöz

2.2.8 Dashboard
Prioritás: Közepes
Álláskereső dashboard:

Mentett állások
Jelentkezések státusza
Javasolt állások (profil alapján)
Profil teljességi mutató

Munkáltató dashboard:

Aktív állásaim
Új jelentkezések száma
Statisztikák (nézettség, jelentkezések száma)
Gyors állásfeladás gomb

2.3 Nem-funkcionális Követelmények
2.3.1 Teljesítmény

Oldalbetöltési idő: max 3 másodperc
Keresési válaszidő: max 1 másodperc
Egyidejű felhasználók: min. 100 felhasználó támogatása

2.3.2 Biztonság

HTTPS protokoll használata
Jelszavak titkosított tárolása
SQL injection elleni védelem
XSS (Cross-Site Scripting) védelem
CSRF védelem
Munkamenet időkorlát (30 perc inaktivitás után)

2.3.3 Használhatóság

Reszponzív design (mobil, tablet, desktop)
Intuitív felhasználói felület
Egyértelmű navigáció
Hibaüzenetek érthetőek és segítőkészek
Betöltési indikátorok

2.3.4 Kompatibilitás

Modern böngészők támogatása (Chrome, Firefox, Safari, Edge - utolsó 2 verzió)
Mobilos kompatibilitás (iOS, Android)

2.3.5 Karbantarthatóság

Tiszta, dokumentált kód
Komponens alapú architektúra
Újrafelhasználható komponensek
Verziókezelés (Git)


4. Felhasználói Felület (UI) Követelmények
4.1 Színséma

Elsődleges szín: [Meghatározandó]
Másodlagos szín: [Meghatározandó]
Háttérszín: Világos, tiszta
Szövegszín: Jól olvasható kontraszttal

4.2 Tipográfia

Tiszta, modern betűtípus (pl. Roboto, Open Sans, Inter)
Jól olvasható betűméretek
Hierarchikus címsor rendszer

4.3 Navigáció
Fő navigációs sáv:

Logo (bal oldal)
Állások böngészése
Céges profil / Dashboard (bejelentkezett felhasználóknak)
Bejelentkezés / Regisztráció (kijelentkezett felhasználóknak)
Profil menü (bejelentkezett felhasználóknak)

4.4 Főbb Oldalak
Kezdőlap

Hero szekció keresővel
Kiemelt állások
Kategóriák
Call-to-action gombok

Állások Lista Oldal

Keresési és szűrési sidebar
Állások lista kártyás nézetben
Lapozás

Állás Részletes Oldal

Részletes információk
Jelentkezési gomb
Hasonló állások ajánlása

Profil Oldal

Személyes/Céges információk
Szerkesztési lehetőség

Dashboard

Áttekintő statisztikák
Gyors műveletek
Legutóbbi aktivitások

6. Fejlesztési Fázisok
Fázis 1: Alapműködés (MVP - Minimum Viable Product)
Időtartam: 4-6 hét

Felhasználói regisztráció és bejelentkezés
Alapvető profil kezelés
Állások listázása és részletes oldal
Állás feladása (employer)
Jelentkezés (seeker)
Alapvető keresés

Fázis 2: Bővített Funkciók
Időtartam: 3-4 hét

Haladó szűrés és keresés
Dashboard mindkét szerepkörre
Jelentkezések kezelése (employer oldalon)
Mentett állások funkció
Profil fejlesztések (skills, experience)

Fázis 3: Finomítások
Időtartam: 2-3 hét

Email értesítések
Állás ajánló rendszer
Cég oldal
Statisztikák
UI/UX finomítások
Teljesítmény optimalizálás


7. Tesztelési Követelmények
7.1 Unit Tesztek

Szolgáltatások (services) tesztelése
Komponensek logikájának tesztelése
Utility függvények tesztelése

7.2 Integrácios Tesztek

API végpontok tesztelése
Adatbázis műveletek tesztelése
Komponensek közötti interakciók

7.3 E2E (End-to-End) Tesztek

Teljes felhasználói folyamatok tesztelése
Regisztráció → Bejelentkezés → Álláskereső/Employer műveletek

7.4 Manuális Tesztek

UI/UX tesztelés
Különböző böngészőkön való működés
Reszponzív design ellenőrzése
Accessibility (akadálymentesség) ellenőrzése


8. Kockázatok és Kihívások
8.1 Technikai Kockázatok

Angular verziókompatibilitási problémák
Backend integráció komplexitása
Fájlfeltöltés kezelése (CV-k)
Teljesítményproblémák nagy adatmennyiség esetén

8.2 Üzleti Kockázatok

Felhasználói elfogadottság
Konkurencia
Adatvédelmi megfelelőség (GDPR)

8.3 Megoldási Javaslatok

Verziókezelés és dokumentáció folyamatos karbantartása
Optimalizálási technikák alkalmazása (lazy loading, caching)
Rendszeres code review
Biztonsági auditok


9. Dokumentáció
9.1 Fejlesztői Dokumentáció

Kód dokumentálása (comments, JSDoc)
API dokumentáció (Swagger/OpenAPI)
Architektúra diagramok
Telepítési útmutató

9.2 Felhasználói Dokumentáció

Felhasználói kézikönyv
GYIK (FAQ)
Video tutorialok (opcionális)


10. Jövőbeli Fejlesztési Lehetőségek

Multi-language support (többnyelvűség)
Chat funkció (employer-seeker kommunikáció)
Video interjú integráció
LinkedIn integráció
Premium funkciók (kiemelt hirdetések)
Mobil alkalmazás (React Native / Flutter)
AI alapú CV elemzés
Skill assessment tesztek


11. Elfogadási Kritériumok
A projekt akkor tekinthető sikeresnek, ha:

Minden funkcionális követelmény implementálásra került
Az alkalmazás hibamentesen működik a támogatott böngészőkben
A tesztek legalább 80%-os lefedettséget biztosítanak
A teljesítmény követelmények teljesülnek
A biztonsági követelmények teljesülnek
A dokumentáció teljes és naprakész
A kód minősége megfelel az előírt standardoknak
