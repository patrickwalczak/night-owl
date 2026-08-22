# TODO

## Baza Danych I Domena

- Zdecydować, czy produkt zostaje przypisany do jednej kategorii, czy przechodzę na model many-to-many przez `ProductCategory`.
- Co z tagami, kolekcjami?
- Wrócić później do widoczności produktów, np. `isPublished`, `isActive` albo bogatszy model statusu/widoczności.
- Przemyśleć sposób zarządzania cenami,
- Wrócić później do stanów magazynowych/dostępności. Nie mieszać zbyt wcześnie prostej dostępności z prawdziwym zarządzaniem stockiem.
- Zastąpić kiedyś pojedyncze `Product.image` modelem galerii, np. `ProductImage` ze zdjęciem głównym, alt textem i kolejnością.

## Filtry I Parametry

- Przed zaawansowanymi filtrami zdecydować, jak modelować techniczne parametry lamp: wartości tekstowe, liczbowe albo boolean.
- Parametry lamp do rozważenia później: producent, kolor, materiał, styl, pomieszczenie, gwint, liczba źródeł światła, moc, lumeny, temperatura barwowa, klasa IP, wymiary.
- Przy implementacji filtrów zbudować backendową logikę contextual facet counts, czyli liczników zależnych od aktualnego kontekstu filtrowania.

## Drzewo Kategorii

- W UI strony kategorii celowo pokazujemy tylko bezpośrednie podkategorie aktualnej kategorii.
- Obecny model z `parentId` obsługuje głębsze zagnieżdżenia. Osobno trzeba później zdecydować, czy lista produktów i liczniki filtrów mają obejmować tylko aktualną kategorię z bezpośrednimi dziećmi, czy całe głębsze drzewo kategorii.
- Zdecydować później, czy URL-e kategorii zostają płaskie po `slug`, czy przechodzą na ścieżki z pełnym drzewem kategorii.

## Spójność Danych

- Przy dodawaniu tabel łączących albo nowych relacji filtrów pilnować constraintów `unique` i indeksów.
- Przed dodaniem nowego constraintu `unique` do istniejącej tabeli sprawdzić duplikaty albo być gotowym na reset/reseed danych developerskich.

## Przyszłe Funkcjonalności

- Strona szczegółów produktu.
- Galeria produktu.
- Ceny i promocje.
- Stany magazynowe/dostępność.
- Koszyk i checkout.
- Warianty produktów, tylko jeśli pojawią się realne wymagania.
- Kolekcje/tagi/landing page'e dla grupowań marketingowych.
- Admin albo importery do backfillowania parametrów, zdjęć, cen i innych przyszłych danych.


Co Nadal Jest Otwarte
Największe decyzje, które kiedyś mogą wymagać refactoru:
czy produkt ma jedną kategorię, czy wiele kategorii,
czy parametry zostają tylko tekstowe, czy dochodzą typy liczbowe/boolean,
jak będą liczone facety,
czy produkt będzie miał warianty,
jak będą wyglądać ceny,
jak będzie wyglądać galeria zdjęć,
czy produkty będą miały widoczność/status publikacji.
