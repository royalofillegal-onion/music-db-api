# RoyalStar Music Streaming Application

A modern music streaming application built with Firebase Authentication and Supabase for data management.

## Features

- User Authentication (Firebase)
- Song Management (Supabase)
- Playlist Creation and Management
- Recently Played Tracking
- Search Functionality
- Responsive Design

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Authentication: Firebase
- Database: Supabase
- Hosting: Static Web Hosting

## Project Structure

```
project-root/
├── www/                      # Web root directory
│   ├── index.html           # Login/Registration page
│   ├── access.html          # Main application page
│   └── assets/              # Static assets
│       ├── images/          # Image files
│       └── fonts/           # Font files
│
├── src/                     # Source code directory
│   ├── js/                  # JavaScript files
│   │   ├── auth.js         # Firebase authentication
│   │   ├── songs.js        # Supabase song data management
│   │   ├── player.js       # Audio player functionality
│   │   └── search.js       # Search functionality
│   │
│   └── css/                 # CSS files
│       ├── auth.css        # Authentication page styles
│       └── main.css        # Main application styles
│
├── database/                # Database files
│   ├── schema.sql          # Database schema
│   ├── policies.sql        # Row Level Security policies
│   └── seed.sql            # Initial data
```

## Setup Instructions

1. Clone the repository
2. Set up Firebase project:
   - Create a new Firebase project
   - Enable Email/Password authentication
   - Update Firebase configuration in `auth.js`

3. Set up Supabase project:
   - Create a new Supabase project
   - Run the SQL files in the database directory
   - Update Supabase configuration in `songs.js`

4. Deploy the application to your preferred static web hosting service

## Development

To run the application locally:
1. Install a local web server (e.g., Live Server for VS Code)
2. Open the project in your code editor
3. Start the local web server
4. Access the application through your browser

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
