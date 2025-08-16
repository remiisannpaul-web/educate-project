# MongoDB Atlas Setup Guide

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

## 2. Create a Free Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

## 3. Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

## 4. Set Up Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

## 5. Get Your Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## 6. Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/educate?retryWrites=true&w=majority
```

Replace:
- `<username>` with your database username
- `<password>` with your database password
- `<cluster>` with your cluster name
- `educate` with your database name

## 7. Seed Your Database

1. Start your development server: `npm run dev`
2. Make a POST request to `/api/seed` to populate your database:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or visit: `http://localhost:3000/api/seed` in your browser

## 8. Test Your Setup

1. Visit `/programs` to see your programs loaded from MongoDB
2. Check the browser console for any errors

## API Endpoints

- `GET /api/programs` - Fetch all programs
- `POST /api/programs` - Create a new program
- `POST /api/seed` - Seed database with sample data (development only)

## Database Schema

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  duration: String,
  level: String,
  category: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

- **Connection Error**: Check your connection string and network access
- **Authentication Error**: Verify your username and password
- **Database Not Found**: The database will be created automatically when you first insert data
