# Landing Page Cristian

Flask landing page ready for Railway.

## Local

```powershell
cd landing_page_Cristian
python app.py
```

Open `http://127.0.0.1:5000`.

## Railway

Railway reads `railway.json` and starts the app with:

```bash
gunicorn --chdir landing_page_Cristian app:app
```

Deploy from GitHub by creating a Railway project and selecting this repository.
