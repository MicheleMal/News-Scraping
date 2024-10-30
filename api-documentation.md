# API Documentation

## Introduzione

Le varie API servono per inserire, visualizzare, filtrare e paginare le notizie dal sito [Ansa Sicilia](https://www.ansa.it/sicilia/) (con un massimo di 10 notizie per pagina)

## URL base

`localhost:3000`

## Endpoints

### Categorie news (/categories-news)

#### Visualizzare tutte le categorie

-   **Endpoint**: `/`
-   **Method**: GET
-   **Esempio di utilizzo**:
    ```http
    GET /categories-news/
    ```
-   **Esempio di risposta**:

    ```json
    [
        {
            "_id": "66ce03f4da9588d880e5fee0",
            "type": "Cronaca"
        },
        {
            "_id": "66ce0449da9588d880e5fee2",
            "type": "Politica"
        },
        {
            "_id": "66ce0471da9588d880e5fee3",
            "type": "Economia"
        }
    ]
    ```

-   **Codici di stato**:
    -   **200**: Restituisce correttamente tutte le categorie
    -   **404**: Non ci sono categorie caricate nel database

### Gestione news (/scraping)

#### Inserire manualmente notizie

-   **Endpoint**: `/insertDatabase`
-   **Method**: GET
-   **Esempio di utilizzo**:
    ```http
    GET /scraping/insertDatabase
    ```
-   **Esempio di risposta**:

    ```json
    [
        {
            "title": "Commissione parlamentare sulle periferie a Palermo",
            "summary": "Delegazione in missione tra Brancaccio e lo Zen",
            "date": "2024-09-16T15:02:00.000Z",
            "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/commissione-parlamentare-sulle-periferie-a-palermo_3d05502a-cc39-4b50-89da-12dd578ff4c3.html",
            "id_category": "66ce03f4da9588d880e5fee0",
            "_id": "66e85b5ca5c9d7c7721d5285",
            "__v": 0
        },
        {
            "title": "Appello contro l'osservatorio astronomico a Monte Mufara",
            "summary": "Lanciato da ambientalisti, sottoscritto da accademici ed esperti",
            "date": "2024-09-16T14:21:00.000Z",
            "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/appello-contro-losservatorio-astronomico-a-monte-mufara_f61d4f39-a3a8-4c21-aee1-2c39ba22f7a1.html",
            "id_category": "66ce03f4da9588d880e5fee0",
            "_id": "66e85b5ca5c9d7c7721d5288",
            "__v": 0
        }
    ]
    ```

-   **Codici di stato**:
    -   **200**: Restituisce correttamente tutte le notizie
    -   **408**: Tempo scaduto per la navigazione

#### Visualizzare tutte le notizie

-   **Endpoint**: `/news`
-   **Method**: GET
-   **Esempio di utilizzo**:
    ```http
    GET /scraping/news
    ```
-   **Esempio di risposta**:

    ```json
    {
        "news": [
            {
                "_id": "66e85b5ca5c9d7c7721d52a9",
                "title": "Cittadinanza onoraria di Trapani alle Ong, è polemica",
                "summary": "Sindaco, 'Salvano vite'. Fdi, 'Sfiora l'assurdo'",
                "date": "2024-09-16T16:00:00.000Z",
                "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/cittadinanza-onoraria-di-trapani-alle-ong-e-polemica_4b255764-971b-496f-8dcc-a61a6a307a71.html",
                "id_category": {
                    "_id": "66ce0449da9588d880e5fee2",
                    "type": "Politica"
                },
                "__v": 0
            },
            {
                "_id": "66e85b5ca5c9d7c7721d52f1",
                "title": "'Puccini opera gala' chiude la stagione lirica a Taormina",
                "summary": "Ideato dal regista Castiglione, il 27 settembre al Teatro Antico",
                "date": "2024-09-16T15:19:00.000Z",
                "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/puccini-opera-gala-chiude-la-stagione-lirica-a-taormina_b33a51b6-700d-4a0d-9174-1b6b60b2fb79.html",
                "id_category": {
                    "_id": "66ce048bda9588d880e5fee4",
                    "type": "Cultura"
                },
                "__v": 0
            }
        ],
        "countPage": 2
    }
    ```

-   **Codici di stato**:
    -   **200**: Restituisce correttamente tutte le notizie
    -   **404**: Non ci sono notizie caricate nel database

#### Filtrare notizie

-   **Endpoint**: `/news`
-   **Method**: GET
-   **Parametri Query**:
    -   `t`: Filtro per tipo di categoria (es. Cronaca, Politica)
    -   `dateI`: Data inizio range (es. 2024-03-01)
    -   `dateF`: Data fine range (es. 2024-03-20)
    -   `page`: Numero pagina
    -   `recentN`: numero per mostrare le ultime n notizie recenti
-   **Esempio di utilizzo**:
    ```http
    GET /scraping/news?t=Cronaca
    ```
-   **Esempio di risposta**:

    ```json
    {
        "news": [
            {
                "_id": "66e85b5ca5c9d7c7721d5285",
                "title": "Commissione parlamentare sulle periferie a Palermo",
                "summary": "Delegazione in missione tra Brancaccio e lo Zen",
                "date": "2024-09-16T15:02:00.000Z",
                "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/commissione-parlamentare-sulle-periferie-a-palermo_3d05502a-cc39-4b50-89da-12dd578ff4c3.html",
                "id_category": {
                    "_id": "66ce03f4da9588d880e5fee0",
                    "type": "Cronaca"
                },
                "__v": 0
            },
            {
                "_id": "66e85b5ca5c9d7c7721d5288",
                "title": "Appello contro l'osservatorio astronomico a Monte Mufara",
                "summary": "Lanciato da ambientalisti, sottoscritto da accademici ed esperti",
                "date": "2024-09-16T14:21:00.000Z",
                "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/appello-contro-losservatorio-astronomico-a-monte-mufara_f61d4f39-a3a8-4c21-aee1-2c39ba22f7a1.html",
                "id_category": {
                    "_id": "66ce03f4da9588d880e5fee0",
                    "type": "Cronaca"
                },
                "__v": 0
            }
        ],
        "countPage": 1
    }
    ```

-   **Codici di stato**:
    -   **200**: Restituisce correttamente tutte le notizie
    -   **400**: Errore generico
    -   **404**: Non ci sono notizie caricate nel database

#### Paginazione news

-   **Endpoint**: `/news`
-   **Method**: GET
-   **Parametri Query**:
    -   page: numero pagina
-   **Esempio di utilizzo**:
    ```http
    GET /scraping/news?page=1
    ```
-   **Esempio di risposta**:

    ```json
    {
        "news": [
            {
                "_id": "66e85b5ca5c9d7c7721d5285",
                "title": "Commissione parlamentare sulle periferie a Palermo",
                "summary": "Delegazione in missione tra Brancaccio e lo Zen",
                "date": "2024-09-16T15:02:00.000Z",
                "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/commissione-parlamentare-sulle-periferie-a-palermo_3d05502a-cc39-4b50-89da-12dd578ff4c3.html",
                "id_category": {
                    "_id": "66ce03f4da9588d880e5fee0",
                    "type": "Cronaca"
                },
                "__v": 0
            },
            {
                "_id": "66e85b5ca5c9d7c7721d5288",
                "title": "Appello contro l'osservatorio astronomico a Monte Mufara",
                "summary": "Lanciato da ambientalisti, sottoscritto da accademici ed esperti",
                "date": "2024-09-16T14:21:00.000Z",
                "link": "https://www.ansa.it/sicilia/notizie/2024/09/16/appello-contro-losservatorio-astronomico-a-monte-mufara_f61d4f39-a3a8-4c21-aee1-2c39ba22f7a1.html",
                "id_category": {
                    "_id": "66ce03f4da9588d880e5fee0",
                    "type": "Cronaca"
                },
                "__v": 0
            }
        ],
        "countPage": 1
    }
    ```

-   **Codici di stato**:
    -   **200**: Restituisce correttamente tutte le notizie
    -   **400**: Errore generico
    -   **404**: Non ci sono notizie caricate nel database
