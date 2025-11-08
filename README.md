# Motion

## Backend Motion - Dev Commands

### Commandes utiles

```bash
git clone https://github.com/kps-243/Motion.git
cd backend
cp .env.exemple .env
npm install
nodemon server.js
```
### Endpoints
| Méthode | URL                  | Body JSON                                               | Description                                  |
|---------|--------------------|--------------------------------------------------------|----------------------------------------------|
| POST    | /api/auth/signup    | `{ "name", "firstName", "email", "password", "role" }` | Crée un nouvel utilisateur                  |
| POST    | /api/auth/login     | `{ "email", "password" }`                              | Connexion et récupération du token JWT      |
| GET     | /api/profile        | Header : `Authorization: Bearer <token>`              | Route protégée, renvoie l'ID de l'utilisateur connecté |

