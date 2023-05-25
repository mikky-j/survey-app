# Steps to set up the database

1. Download and install postgresql
2. Open your terminal and run the following command

```bash
psql -U postgres
```

3. Enter your password
4. Run the following command

```sql
CREATE DATABASE survey;
```

5. Create a .env file in the project with the following details

```env
DATABASE_URL="postgresql://postgres:<your-password>@localhost:5432/survey?schema=public"
NEXT_PUBLIC_JWT_SECRET="<Your-secret>"
```

# Steps to set up project[Nde]

1. Download NodeJs on Windows
2. Navigate to the folder where code is
3. Right click and open in terminal
4. Then run `npm i`
5. Then run `npx prisma migrate dev`
6. Navigate the `https://localhost:3000`
